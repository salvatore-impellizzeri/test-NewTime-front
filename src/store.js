import { reactive } from "vue";

export const store = reactive({
    userUpdate: false,
    handleUserUpdate(){
        this.userUpdate = true;
        setTimeout(() => {
            this.userUpdate = false;
          }, 3000);
    },
    userCreated: false,
    handleUserCreated(){
        this.userCreated = true;
        setTimeout(() => {
            this.userCreated = false;
          }, 3000);
    },
    apiUrl: import.meta.env.VITE_API_URL
});