import { reactive } from "vue";

export const store = reactive({
    userUpdate: false,
    handleUserUpdate(){
        this.userUpdate = true;
        setTimeout(() => {
            this.userUpdate = false;
          }, 3000);
    }
});