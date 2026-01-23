<template>
  <div class="px-4 py-6 sm:px-0">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="mt-1 text-sm text-gray-500">Manage your account preferences.</p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading...</p>
    </div>

    <div v-else-if="error" class="rounded-md bg-red-50 p-4 mb-6">
      <div class="text-sm text-red-700">{{ error }}</div>
    </div>

    <div v-else class="bg-white shadow rounded-lg divide-y divide-gray-200">
      <!-- Theme Setting -->
      <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 class="text-base font-medium text-gray-900">Theme</h3>
            <p class="mt-1 text-sm text-gray-500">Choose your preferred color theme.</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <select
              v-model="settings.theme"
              @change="updateSettings"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Language Setting -->
      <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 class="text-base font-medium text-gray-900">Language</h3>
            <p class="mt-1 text-sm text-gray-500">Select your preferred language.</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <select
              v-model="settings.language"
              @change="updateSettings"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications Setting -->
      <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 class="text-base font-medium text-gray-900">Notifications</h3>
            <p class="mt-1 text-sm text-gray-500">Enable or disable email notifications.</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              type="button"
              @click="toggleNotifications"
              :class="[
                settings.notifications ? 'bg-primary-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              ]"
            >
              <span
                :class="[
                  settings.notifications ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success message -->
    <div v-if="successMessage" class="mt-4 rounded-md bg-green-50 p-4">
      <div class="text-sm text-green-700">{{ successMessage }}</div>
    </div>

    <!-- OAuth Connected Accounts (Placeholder) -->
    <div class="mt-8 bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-base font-medium text-gray-900 mb-4">Connected Accounts</h3>
        <p class="text-sm text-gray-500 mb-4">
          Connect your social accounts for easier sign-in (coming soon).
        </p>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-75">
            <div class="flex items-center">
              <span class="text-gray-700">Google</span>
            </div>
            <button
              type="button"
              disabled
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-not-allowed"
            >
              Connect
            </button>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-75">
            <div class="flex items-center">
              <span class="text-gray-700">GitHub</span>
            </div>
            <button
              type="button"
              disabled
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-not-allowed"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});

const config = useRuntimeConfig();

interface Settings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

const settings = ref<Settings>({
  theme: 'light',
  language: 'pt-BR',
  notifications: true,
});

const loading = ref(true);
const error = ref('');
const successMessage = ref('');

const fetchSettings = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const response = await $fetch<{
      success: boolean;
      data: Settings;
    }>(`${config.public.apiBaseUrl}/user/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      settings.value = response.data;
    }
  } catch (err: any) {
    error.value = err.data?.error?.message || 'Failed to load settings.';
  } finally {
    loading.value = false;
  }
};

const updateSettings = async () => {
  successMessage.value = '';
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await $fetch(`${config.public.apiBaseUrl}/user/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: settings.value,
    });

    successMessage.value = 'Settings updated successfully!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (err: any) {
    error.value = err.data?.error?.message || 'Failed to update settings.';
  }
};

const toggleNotifications = () => {
  settings.value.notifications = !settings.value.notifications;
  updateSettings();
};

onMounted(() => {
  fetchSettings();
});
</script>
