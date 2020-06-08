<template>
    <b-card :title="getArticleTitle(itemId)" style="max-width: 20rem;" class="mb-2 article-card">
        <b-icon-x-square
                class="close-icon"
                @click="showModal=true"
                v-b-tooltip.hover
                title="Удалить заметку"
        ></b-icon-x-square>
        <b-modal
                id="modal-delete"
                title="Внимание!"
                v-model="showModal"
                @ok="okPressed"
                @cancel="showModal=false"
        >
            <p>Заметка "{{ getArticleTitle(itemId) }}"</p>
            <p class="my-4">Вы действительно хотите удалить эту заметку?</p>
        </b-modal>
        <b-card-text>
            <hr>
            <ul>
                <li v-for="(listItem, index) in getTodoFragment(itemId, showIndex)"
                    :key="index">
                    <div class="icon-wrapper">
                        <b-icon-check class="check-icon" v-if="listItem.done"></b-icon-check>
                    </div>
                    {{ listItem.text }}
                </li>
            </ul>
            <b-button v-if="getTodoLength(itemId) > 2" variant="light" block size="sm" @click="switchShown">
                <b-icon :icon="buttonIcon" v-b-tooltip.hover :title="buttonTooltip"></b-icon>
            </b-button>
            <hr>
        </b-card-text>
        <b-button href="#" variant="outline-primary" @click="editPressed">Редактировать</b-button>
    </b-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import store from '../store';
    export default {
        name: "Item",
        props: [
            'itemId'
        ],
        data() {
            return {
                showModal: false,
                showIndex: 1,
                buttonIcon: 'arrow-bar-down',
                buttonTooltip: 'Показать все'
            }
        },
        computed: {
            ...mapGetters(['getArticleTitle', 'getTodoFragment', 'getTodoLength'])
        },
        methods: {
            ...mapMutations(['deleteArticle']),
            okPressed() {
                this.showModal = false;
                this.deleteArticle(this.$props.itemId);
            },
            switchShown() {
                if (this.showIndex <= 1) {
                    this.showIndex = store.getters.getTodoLength(this.$props.itemId) - 1;
                    this.buttonIcon = 'arrow-bar-up';
                    this.buttonTooltip = 'Свернуть';
                } else {
                    this.showIndex = 1;
                    this.buttonIcon = 'arrow-bar-down';
                    this.buttonTooltip = 'Показать все';
                }
            },
            editPressed() {
                this.$router.push({ name: 'Article', params: { id: this.$props.itemId } });
            }
        }
    }
</script>

<style scoped lang="sass">
    .article-card
        margin: 10px
    .card-list
        display: flex
        justify-content: flex-start
    ul
        display: flex
        flex-direction: column
        align-items: flex-start
        justify-content: flex-start
        padding: 0
        li
            display: flex
            list-style-type: none
    .close-icon
        position: absolute
        top: 5px
        right: 5px
        cursor: pointer
        &:hover
            color: red
    .icon-wrapper
        width: 20px
    .check-icon
        stroke: green
</style>