<template>
    <div class="container">
      <section class="screenplay-section">
        <!-- Loop through the three different stories -->
        <div v-for="(story, storyIndex) in stories" :key="storyIndex" class="story-section card-effect">
          <div class="story-header">
            <h2 class="story-title">داستان {{ storyIndex + 1 }}</h2>
          </div>
  
          <!-- Display story content in card style -->
          <div class="story-content">
            <p v-if="story.parts.length === 0" class="empty-message">
              یک داستان شروع کنید یا به داستان موجود ادامه دهید!
            </p>
            <div v-for="(part, partIndex) in story.parts" :key="partIndex" class="story-part" :title="part.user.name">
              <span>{{ part.text }}</span>
            </div>
          </div>
  
          <!-- Participants Section -->
          <div class="participants">
            <h3>مشارکت کنندگان در تولید این اثر</h3>
            <div class="participant" v-for="user in story.users" :key="user.id">
              <img :src="user.avatar || defaultAvatar" alt="avatar" class="avatar" />
              <span class="username">{{ user.name }}</span>
            </div>
          </div>
  
          <!-- Input Area for Adding Story Part -->
          <div class="input-area">
            <textarea 
              v-model="storyInputs[storyIndex]"
              class="story-input"
              placeholder="قسمت بعدی داستان را اضافه کنید..."
            ></textarea>
            <div class="controls">
                <span class="char-count">تعداد کاراکتر: {{ storyInputs[storyIndex].length }}</span>
              <button @click="addStoryPart(storyIndex)" :disabled="storyInputs[storyIndex].trim().length < 10" class="add-button">
                افزودن به داستان
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // Initial stories data
  const stories = ref([
    { parts: [], users: [], title: 'داستان 1' },
    { parts: [], users: [], title: 'داستان 2' },
    { parts: [], users: [], title: 'داستان 3' }
  ])
  
  // Placeholder user data
  const currentUser = {
    id: 1,
    name: "کاربر فعلی",
    avatar: "https://via.placeholder.com/50"
  }
  
  // Default avatar if user avatar fails to load
  const defaultAvatar = "https://via.placeholder.com/50/cccccc";
  
  // Sample avatars for participants
  const sampleAvatars = [
    "https://via.placeholder.com/50/ff9e9e",
    "https://via.placeholder.com/50/9effe5",
    "https://via.placeholder.com/50/9ea7ff",
    "https://via.placeholder.com/50/faff9e",
    "https://via.placeholder.com/50/ff9ea7"
  ]
  
  // Function to generate a user with avatar
  function generateUser(id, name) {
    return { id, name, avatar: sampleAvatars[id % sampleAvatars.length] }
  }
  
  // Adding sample users to each story for demonstration
  stories.value.forEach(story => {
    story.users = [
      generateUser(2, "یوسف"),
      generateUser(3, "فاطمه"),
      generateUser(4, "احمد"),
      generateUser(5, "زهرا")
    ]
  })
  
  // Separate input for each story
  const storyInputs = ref(['', '', ''])
  
  // Method to add a new story part
  function addStoryPart(storyIndex: number) {
    const text = storyInputs.value[storyIndex].trim()
    if (text.length >= 10) {
      stories.value[storyIndex].parts.push({
        text,
        user: currentUser
      })
      if (!stories.value[storyIndex].users.some(u => u.id === currentUser.id)) {
        stories.value[storyIndex].users.push(currentUser)
      }
      storyInputs.value[storyIndex] = ''
    }
  }
  </script>
  
  <style scoped lang="scss">
  .screenplay-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    direction: rtl;
  
    .story-section {
      background-color: #dbd9d9;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
      border: 1px solid #2c2828;
      margin-bottom: 30px;
      position: relative;
      overflow: hidden;
  
      .story-header {
        text-align: center;
        margin-bottom: 20px;
  
        .story-title {
          font-size: 2em;
          color: #00796b;
          font-weight: bold;
          border-bottom: 3px solid #004d40;
          padding-bottom: 10px;
        }
      }
  
      .story-content {
        padding: 25px;
        background-color: #c0c0c0;
        border-radius: 12px;
        margin-bottom: 20px;
        position: relative;
  
        .story-part {
          padding: 12px;
          line-height: 2.5;
          background: #dddfdf;
          display: inline; /* Change display to inline for same line addition */
          transition: background-color 0.3s;
          margin-bottom: 10px;
  
          &:hover {
            background-color: #80cbc4;
            box-shadow: 0 4px 8px rgba(0, 150, 136, 0.3);
          }
        }
  
        .empty-message {
          color: #555;
          text-align: center;
          font-style: italic;
        }
      }
  
      .participants {
        margin-top: 20px;
  
        h3 {
          font-size: 1.4em;
          color: #004d40;
          margin-bottom: 10px;
        }
  
        .participant {
          display: inline-flex;
          align-items: center;
          margin: 8px 10px;
          transition: transform 0.3s;
  
          &:hover {
            transform: scale(1.1);
          }
  
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-left: 8px;
            border: 2px solid #ddd;
          }
  
          .username {
            font-size: 1em;
            color: #333;
          }
        }
      }
  
      .input-area {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        direction: ltr;
  
        .story-input {
          width: 100%;
          min-height: 140px;
          padding: 14px;
          font-size: 1.1em;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #f1f8e9;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.05);
        }
  
        .controls {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
  
          .add-button {
            padding: 12px 20px;
            background-color: #00796b;
            color: #fff;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  
            &:hover {
              background-color: #004d40;
            }
  
            &:disabled {
              background-color: #e0e0e0;
              color: #999;
              cursor: not-allowed;
            }
          }
  
          .char-count {
            font-size: 1em;
            color: #666;
          }
        }
      }
    }
  }
  </style>
  