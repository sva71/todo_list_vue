<template>
    <div class="home">
        <div class="icon-wrapper">
            <b-icon
                    icon="plus-square"
                    class="add-icon"
                    v-b-tooltip.hover
                    title="Добавить заметку"
                    @click="newArticle"
            ></b-icon>
            <b-icon
                    icon="trash"
                    class="add-icon"
                    v-b-tooltip.hover
                    title="Очистить хранилище"
                    v-b-modal.modal-clear
            ></b-icon>
            <b-modal
                    id="modal-clear"
                    title="Внимание!"
                    @ok="onClear"
            >
                <p class="my-4">Вы действительно хотите очистить локальное хранилище?</p>
                <p class="my-3">(действие этой операции невозможно будет отменить)</p>
            </b-modal>
        </div>
        <div class="articles">
            <div v-for="item in articles" :key="item.id">
                <Item :itemId="item.id"></Item>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import Item from '../components/Item';

    export default {
        name: 'Home',
        components: {
            'Item': Item
        },
        computed: {
            ...mapState({
                articles: state => state.articles,
            })
        },
        methods: {
            newArticle() {
                this.$router.push({ name: 'Article', params: { id: '0' } });
            },
            onClear() {
                localStorage.clear();
            }
        }
    }

</script>

<style scoped lang="sass">
    .home
        display: flex
        justify-content: center
        flex-wrap: wrap
        width: 80%
        margin: auto
        .icon-wrapper
            display: flex
            justify-content: space-between
            width: 100%
            margin: 10px 0
        .add-icon
            width: 30px
            height: 30px
            cursor: pointer
            &:hover
                color: mediumblue
        .articles
            display: flex
            justify-content: flex-start
            flex-wrap: wrap
            width: 100%
            margin: 10px 0
</style>