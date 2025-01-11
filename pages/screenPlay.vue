<template>
  <div class="container">
    <section class="screenplay-section">
      <div v-for="screenplay in screenplays" :key="screenplay.id" class="story-section card-effect">
        <!-- Title Section -->
        <div class="story-header">
          <h2 class="story-title">{{ screenplay.title }}</h2>
        </div>

        <!-- Content Section -->
        <div class="story-content">
          <div 
            class="story-part" 
            dir="rtl"
          >
            <span>
              {{ isExpanded[screenplay.id] ? screenplay.text : truncateText(screenplay.text, 3) }}
            </span>
          </div>
          <span 
            class="continue-link" 
            @click="toggleStory(screenplay.id)"
            >
            {{ isExpanded[screenplay.id] ? 'نمایش کمتر' : 'ادامه داستان' }}
            </span>
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <textarea 
            v-model="newText" 
            class="story-input" 
            placeholder="قسمت بعدی داستان را اضافه کنید..."
          ></textarea>
          <div class="controls">
            <span class="char-count">تعداد کاراکتر: {{ newText.length }}</span>
            <button 
              @click="addUpdate(screenplay.id)" 
              :disabled="newText.trim().length < 10" 
              class="add-button"
            >
              اضافه کردن
            </button>
          </div>
        </div>

        <!-- Participants Section -->
        <div class="participants">
          <div class="participant" :key="screenplay.creator.id">
            <img 
            v-if="screenplay.creator.first_name || screenplay.creator.last_name"
            :src="`https://fiatre.ir${screenplay.creator.avatar || defaultAvatar}`"
            alt="User Avatar"
            class="avatar"
        />
            <span class="username">
              {{ screenplay.creator.first_name }} {{ screenplay.creator.last_name }}
            </span>
          </div>
          <div class="participant" v-for="updater in screenplay.updaters" :key="updater.id">
            <img
             v-if="updater.first_name || updater.last_name"
              :src="`https://fiatre.ir${updater.avatar || defaultAvatar}`"
              alt="avatar"
              class="avatar"
            />
            <span class="username">
              {{ updater.first_name }} {{ updater.last_name }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const defaultAvatar = '/assets/images/icons/person-profile-icon.webp';
const screenplays = ref([]);
const newText = ref('');
const isExpanded = ref({});

const truncateText = (text, lines) => {
  const lineLimit = lines * 60; // Approximate character limit per line
  return text.length > lineLimit ? text.slice(0, lineLimit) + '...' : text;
};

const toggleStory = (id) => {
  isExpanded.value[id] = !isExpanded.value[id];
};

const response = await useApiFetch('/api/screenplays/');
if (response.status.value === 'success') {
  screenplays.value = response.data.value.results;
}

const addUpdate = async (screenplayId: number) => {
  // Implementation for adding updates
};
</script>
  
  <style scoped lang="scss">
  .screenplay-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  
  
    .story-section {
    
      background-color: #dbd9d9;
      padding: 40px;
      line-height: 2;
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
        direction: rtl !important;
        background-color: #c0c0c0;
        border-radius: 12px;
        margin-bottom: 20px;
        position: relative;
  
        .continue-link {
        display: block;
        margin: 10px 0 0 0;
        color: #00796b;
        font-weight: bold;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
        }
      }

      .participants {
  display: flex; /* Align items in a row */
  gap: 15px; /* Space between each participant */
  flex-wrap: wrap; /* Wrap to next line if needed */
  justify-content: flex-start; /* Align items to the left */
  margin-top: 20px;

  .participant {
    display: flex;
    flex-direction: column; /* Stack avatar and name vertically */
    align-items: center; /* Center-align avatar and name */
    text-align: center;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 8px; /* Space between avatar and name */
      border: 2px solid #ddd;
    }

    .username {
      font-size: 0.8em;
      color: #333;
      white-space: nowrap; /* Prevent name wrapping */
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
  