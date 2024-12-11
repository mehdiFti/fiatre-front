<template>
  <transition name="fade">
    <div v-if="showMailBox" class="mailbox">
      <div class="mailbox-header">
        <button class="close-btn" @click="closeMailBox">✖</button>
        <h2 class="mailbox-title">پیام‌ها</h2>
      </div>
      <div class="mail-list">
        <div v-for="(mail, index) in sortedMails" :key="index" class="mail-item">
          <div class="mail-header">
            <div class="del-time-eye">
              {{ mail.time }}
              <button class="delete-btn" @click="confirmDelete(index)">🗑</button>
              <nuxt-link>
                <nuxt-icon class="mail-icon" name="eye" @click="redirectToSrc(mail.src)" />
              </nuxt-link>
            </div>
          </div>
          <div class="mail-message">
            <p :class="{ 'truncate': !mail.showMore }">{{ mail.message }}</p>
            <button v-if="isLongMessage(mail.message)" @click="toggleSeeMore(index)" class="see-more-btn">
              {{ mail.showMore ? 'نمایش کمتر' : 'نمایش بیشتر' }}
            </button>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="showConfirmModal" class="confirm-modal">
          <div class="confirm-content">
            <p>پیام پاک شود؟</p>
            <div class="confirm-buttons">
              <nuxt-icon name="correct" @click="deleteMail(confirmIndex)" style="font-size: 25px;" />
              <nuxt-icon name="cancel" @click="showConfirmModal = false" style="font-size: 25px;" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, nextTick } from 'vue';

const props = defineProps({
  showMailBox: Boolean
});

const emit = defineEmits(['close']);

const showConfirmModal = ref(false);
const confirmIndex = ref(null);
const mails = ref([
  { time: '10:00 ', message: 'این یک متن فرضی  است ک قررار است صد ها بار مختلف در جای های مختلف تکرار شود.', showMore: false, src: 'link_to_src_1' },
  { time: '10:05', message: 'این یک متن فرضی است ک قررار است صد ها بار مختلف یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن یک متن  در جای های مختلف تکرار شود..', showMore: false, src: 'link_to_src_2' },
  { time: '10:10', message: 'Another message to the user.', showMore: false, src: 'link_to_src_3' },
  { time: '10:15', message: 'این یک متن فرضی است ک قررار است صد ها بار مختلف در جای های مختلف تکرار شود..', showMore: false, src: 'link_to_src_4' },
  { time: '10:20', message: 'این یک متن فرضی است ک قررار است صد ها بار مختلف در جای های مختلف تکرار شود..', showMore: false, src: 'link_to_src_5' },
  { time: '10:25', message: 'A short message.', showMore: false, src: 'https//fiatre.ir' },
  { time: '10:30', message: 'این یک متن فرضی است ک قررار است صد ها بار مختلف در جای های مختلف تکرار شود..', showMore: false, src: 'link_to_src_7' },
  { time: '10:35', message: 'This is a reply to your comment.', showMore: false, src: 'link_to_src_8' },
]);

const sortedMails = computed(() => {
  return mails.value.sort((a, b) => new Date(b.time) - new Date(a.time));
});

function confirmDelete(index) {
  confirmIndex.value = index;
  showConfirmModal.value = true;
}

function deleteMail(index) {
  mails.value.splice(index, 1);
  showConfirmModal.value = false;
}

function toggleSeeMore(index) {
  mails.value[index].showMore = !mails.value[index].showMore;
}

function isLongMessage(message) {
  return message.length > 100;
}

import { useRouter } from 'vue-router';
const router = useRouter();

function redirectToSrc(src) {
  router.push(src);
}


function closeMailBox() {
  emit('close');
  nextTick(() => {
    // Update DOM or any necessary action after closing the mailbox
  });
}
</script>

<style lang="scss" scoped>
 ::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

  .mailbox {
    position: fixed;
    top: 53%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 400px;
    // background: rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 0 0 15px 15px ;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    overflow-y: auto;
    padding: 20px;
    z-index: 1000;
    transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out; // Reduced duration
    text-align: right; 
  }


  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  .mailbox-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $white;
  }
  
  .close-btn:hover {
    transform: scale(1.2);
    transition: transform 0.2s;

  }
  

  .mail-list {
    margin-top: 5px;
    height: 300px;
    overflow-y: auto;
    padding-right: 10px;
  }
  
  .mail-list::-webkit-scrollbar {
    width: 10px;
  }

  .mail-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    
  }

  .mail-list::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #995353, #ffffff);
    border-radius: 10px;
  }

  .mail-list::-webkit-scrollbar-thumb:hover {
 cursor: pointer;
  }

  .mail-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 15px 0;
    color: $white;
  }
  
  .mail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .del-time-eye {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 0.9em;
    color: $gray-400;
  }
  
  .delete-btn {
    background: none;
    border: none;
    color: #ff6b6b;
    cursor: pointer;
    font-size: 30px;
    transition: transform 0.2s;
  }
  
  .delete-btn:hover {
    transform: scale(1.2);
  }
  
  .mail-message {
    margin-top: 10px;
    font-size: 16px;
    padding: 0 10px;
    text-align: left; 
  }
  
  .see-more-btn {
    background: none;
    border: none;
    color: $white;
    background: linear-gradient(135deg, #be4444, #b0a9a9);
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 5px;
    transition: color 0.3s;
  }
  
  
  .truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2; 
  }
  

  .mailbox-title {
    margin: 0 auto;
    color: $white;
    text-align: center;
  }

  .confirm-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(100%, -150%);
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    z-index: 1001;
    color: $white;
    text-align: center;
  }

  .confirm-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .confirm-buttons {
    display: flex;
    justify-content: space-around;
    width: 100px;
    margin-top: 10px;
  }

  .confirm-buttons button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: $white;

  }

  .confirm-buttons button:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
  
  .mail-icon {
    font-size: 24px;
    transition: transform 0.3s, color 0.3s;
    position: relative;
  }

  .mail-icon:hover {
    transform: scale(1.2);
    color: $primary;
  }

  .mail-icon:hover::after {
    content: 'بازکردن صفحه';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: $white;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    margin-top: 5px;
    font-size: 12px;
    z-index: 10;
  }


@media (max-width: 530px) {
  .mailbox {
    width: 250px;
    height: 400px;
    top: 67%;
    left: 50%;
  }
  .mail-message {
    font-size: 12px;
  }

  .mailbox-title {
    margin-right: 10px;
    color: $white;
    text-align: center;
  }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s ease; 
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
