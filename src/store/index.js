import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultArticles= [
    {
        id: 1,
        title: 'Утренний моцион',
        list: [
            {
                text: 'Проснуться',
                done: true,
            },
            {
                text: 'Умыться',
                done: false,
            },
            {
                text: 'Приготовить завтрак',
                done: false,
            },
            {
                text: 'Позавтракать',
                done: false,
            },
            {
                text: 'Переодеться',
                done: false,
            },
            {
                text: 'Уехать на работу',
                done: false,
            }
        ]
    },
    {
        id: 2,
        title: 'На работе',
        list: [
            {
                text: 'Проверить почту',
                done: false,
            },
            {
                text: 'Почитать новости',
                done: false,
            },
            {
                text: 'Выпить кофе',
                done: false,
            },
            {
                text: 'Написать компонент',
                done: false,
            },
            {
                text: 'Почитать новости',
                done: false,
            },
            {
                text: 'Выпить кофе',
                done: false,
            },
            {
                text: 'Почитать новости',
                done: false,
            },
            {
                text: 'Протестировать компонент',
                done: false,
            },
            {
                text: 'Выпить кофе',
                done: false,
            },
            {
                text: 'Уехать домой',
                done: false,
            },
        ]
    }
];

export default new Vuex.Store({

    state: {
        articles: JSON.parse(localStorage.getItem('sv_todo')) || defaultArticles
    },
    getters: {
        getArticleTitle: state => id => state.articles.find(article => article.id === id).title,
        getTodo: state => id => state.articles.find(article => (article.id === id)).list,
        getTodoFragment: state => (id, index) => state.articles
            .find(article => (article.id === id))
            .list.filter((item, idx) => idx <= index),
        getTodoLength: state => id => state.articles.find(article => article.id === id).list.length,
        getNewId: state => () => state.articles[state.articles.length-1].id + 1
        },
    mutations: {
        deleteArticle(state, articleId) {
          state.articles = state.articles.filter(({id}) => id !== articleId);
          localStorage.setItem('sv_todo', JSON.stringify(state.articles));
        },
        updateArticle(state, article) {
          state.articles = state.articles.map((item) => item.id === article.id ? article : item);
          localStorage.setItem('sv_todo', JSON.stringify(state.articles));
        },
        addArticle(state, article) {
          state.articles = [...state.articles, article];
          localStorage.setItem('sv_todo', JSON.stringify(state.articles));
        }
    },
    actions: {
    },
    modules: {
    }
})
