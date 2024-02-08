import { defineStore } from 'pinia';

export const useFollowerStore = defineStore({
    id: 'followerStore',
    state: () => ({
        followState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        unfollowState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        setNotificationsState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        localFollowState: {
            following: null,
            notifications: null
        }
    }),
    actions: {
        // Follow
        setFollowData(payload) {
            this.followState.data = payload;
        },
        setFollowLoading(payload) {
            this.followState.loading = payload;
        },
        setFollowError(payload) {
            this.followState.error = payload;
        },

        // Unfollow
        setUnfollowData(payload) {
            this.unfollowState.data = payload;
        },
        setUnfollowLoading(payload) {
            this.unfollowState.loading = payload;
        },
        setUnfollowError(payload) {
            this.unfollowState.error = payload;
        },

        // Set notification
        setNotificationsData(payload) {
            this.setNotificationsState.data = payload;
        },
        setNotificationsLoading(payload) {
            this.setNotificationsState.loading = payload;
        },
        setNotificationsError(payload) {
            this.setNotificationsState.error = payload;
        },

        // Set local states
        setLocalFollowingState(payload) {
            this.localFollowState.following = payload
        },
        setLocalNotificationsState(payload) {
            this.localFollowState.notifications = payload
        },

        localFollow(value) {
            this.setLocalFollowingState(value);
        },

        async follow(id) {
            const { $fetchApi } = useNuxtApp();
            this.setFollowLoading('loading');
            try {
                const data = await $fetchApi("Follow", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ IdUserToFollow: id })
                });

                this.setLocalFollowingState(true);
                this.setLocalNotificationsState('P');

                this.setFollowData(data);
                this.setFollowLoading('loaded');
                this.setFollowError(null);
            }
            catch(error) {
                this.setFollowData(null);
                this.setFollowLoading('error');
                this.setFollowError(error.message);
            }
        },

        async unfollow(id) {
            const { $fetchApi } = useNuxtApp();
            this.setUnfollowLoading('loading');
            try {
                const data = await $fetchApi(`Unfollow?IdUserToFollow=${ id }`, {
                    method: 'DELETE'
                });

                this.setLocalFollowingState(false);
                this.setLocalNotificationsState(null);

                this.setUnfollowData(data);
                this.setUnfollowLoading('loaded');
                this.setUnfollowError(null);
            }
            catch(error) {
                this.setUnfollowData(null);
                this.setUnfollowLoading('error');
                this.setUnfollowError(error.message);
            }
        },

        flush() {
            this.setLocalFollowingState(null);
            this.setLocalNotificationsState(null);
        },

        async setNotifications(id, notifications) {
            const { $fetchApi } = useNuxtApp();
            this.setNotificationsLoading('loading');
            try {
                const data = await $fetchApi("SetNotifications", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        IdUserFollowing: id,
                        Notifications: notifications
                    })
                });

                this.setLocalNotificationsState(notifications.value);

                this.setNotificationsData(data);
                this.setNotificationsLoading('loaded');
                this.setNotificationsError(null);
            }
            catch(error) {
                this.setNotificationsData(null);
                this.setNotificationsLoading('error');
                this.setNotificationsError(error.message);
            }
        }
    }
});
