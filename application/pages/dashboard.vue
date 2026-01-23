<template>
  <div class="px-4 py-6 sm:px-0">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">Welcome back, {{ user?.name }}!</p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading...</p>
    </div>

    <div v-else-if="error" class="rounded-md bg-red-50 p-4">
      <div class="text-sm text-red-700">{{ error }}</div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- User Info Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Email</dt>
          <dd class="mt-1 text-lg font-semibold text-gray-900">{{ dashboardData?.user?.email }}</dd>
        </div>
      </div>

      <!-- Member Since Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Member Since</dt>
          <dd class="mt-1 text-lg font-semibold text-gray-900">
            {{ formatDate(dashboardData?.stats?.memberSince) }}
          </dd>
        </div>
      </div>

      <!-- Last Updated Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Last Updated</dt>
          <dd class="mt-1 text-lg font-semibold text-gray-900">
            {{ formatDate(dashboardData?.stats?.lastUpdated) }}
          </dd>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NuxtLink
          to="/settings"
          class="relative block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 class="text-base font-medium text-gray-900">Account Settings</h3>
          <p class="mt-1 text-sm text-gray-500">Manage your account preferences and settings.</p>
        </NuxtLink>
        <div class="relative block p-6 bg-gray-100 rounded-lg cursor-not-allowed opacity-75">
          <h3 class="text-base font-medium text-gray-900">OAuth Providers</h3>
          <p class="mt-1 text-sm text-gray-500">Connect your social accounts (coming soon).</p>
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

interface DashboardData {
  user: {
    id: string;
    email: string;
    name: string;
  };
  stats: {
    memberSince: string;
    lastUpdated: string;
  };
}

const user = ref<{ id: string; email: string; name: string } | null>(null);
const dashboardData = ref<DashboardData | null>(null);
const loading = ref(true);
const error = ref('');

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

onMounted(async () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  const token = localStorage.getItem('token');
  if (!token) {
    error.value = 'Not authenticated';
    loading.value = false;
    return;
  }

  try {
    const response = await $fetch<{
      success: boolean;
      data: DashboardData;
    }>(`${config.public.apiBaseUrl}/user/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      dashboardData.value = response.data;
    }
  } catch (err: any) {
    error.value = err.data?.error?.message || 'Failed to load dashboard data.';
  } finally {
    loading.value = false;
  }
});
</script>
