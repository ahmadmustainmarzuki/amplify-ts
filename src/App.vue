<template>
  <div id="app">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <h1>Todo App</h1>
        <input type="text" v-model="name" placeholder="Todo name" />
        <input
          type="text"
          v-model="description"
          placeholder="Todo description"
        />
        <button @click="createTodo">Create Todo</button>
        <div v-for="item in todos" :key="item.id">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
export default defineComponent({
  name: "App",
  components: {
    Authenticator,
  },
  async created() {
    this.getTodos();
    this.subscribe();
  },
  data() {
    return {
      name: "",
      description: "",
      todos: [] as any,
    };
  },
  methods: {
    async createTodo() {
      const { name, description } = this;
      if (!name || !description) return;
      const todo = { name, description };
      this.todos = [...this.todos, todo];
      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      });
      this.name = "";
      this.description = "";
    },
    async getTodos() {
      const todos = (await API.graphql({
        query: listTodos,
      })) as any;

      this.todos = todos.data.listTodos.items;
    },
    subscribe() {
      const subscription = API.graphql({ query: onCreateTodo });
      if ("subscribe" in subscription) {
        subscription.subscribe({
          next: (event: any) => {
            let todo = event.value.data.onCreateTodo;
            if (this.todos.some((item: any) => item.name === todo.name)) return; // remove duplications
            this.todos = [...this.todos, todo];
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    },
  },
});
</script>
