import { computed } from 'vue'

export function useRelatedEpisodes(artists: any, currentSlug: string) {
  const artistNames = computed(() => {
    return artists.value
      .filter(artist => artist.title)
      .map(artist => artist.title.replace(/\s+/g, '-'))
  })

  // Make separate requests for each artist
  const artistRequests = artistNames.value.map(name => 
    useAuthFetch<any>(`/api/artists/`, {
      query: {
        search: name
      }
    })
  )

  const relatedEpisodes = computed(() => {
    const uniqueEpisodes = new Map()
    
    artistRequests.forEach(request => {
      if (request.status.value === 'success' && request.data.value?.results) {
        request.data.value.results.forEach((artist: any) => {
          if (artist.related_episodes) {
            artist.related_episodes.forEach((episode: any) => {
              if (episode.slug === currentSlug) return
              
              uniqueEpisodes.set(episode.slug, {
                id: episode.slug,
                title: episode.title,
                image: episode.image,
                slug: episode.slug,
              })
            })
          }
        })
      }
    })
    
    return Array.from(uniqueEpisodes.values())
  })

  return {
    relatedEpisodes
  }
}
