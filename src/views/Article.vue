<template>

    <div class="wrapper">

        <b-form id="input-form" @change="formChanged">

            <b-card bg-variant="light">
                <b-icon-x-square class="icon-delete main" v-b-modal.modal-delete></b-icon-x-square>
                <b-form-group
                        id="input-group-1"
                        label="Заголовок заметки:"
                        label-for="input-1"
                        description="Озаглавьте ваш todo-список как-нибудь"
                >
                    <b-form-input
                            id="input-1"
                            v-model="localArticle.title"
                            type="text"
                            required
                            placeholder="Заголовок"
                    ></b-form-input>
                </b-form-group>
            </b-card>

            <hr>

            <b-card bg-variant="light">
                <b-form-group id="input-group-2" label="Todo-список:">
                    <div class="list-item" v-for="(item, index) in localArticle.list" :key="index">
                        <b-form-checkbox v-model="item.done"></b-form-checkbox>
                        <b-form-input
                                :id="'list-input-'+index"
                                v-model="item.text"
                                type="text"
                                required
                                placeholder="Мероприятие"
                        ></b-form-input>
                        <b-icon-x-square
                                class="icon-delete"
                                @click="deleteListItem(index)"
                                v-b-tooltip.hover
                                title="Удалить мероприятие"
                        ></b-icon-x-square>
                    </div>
                </b-form-group>
            </b-card>

            <hr>

            <b-card bg-variant="light">
                <b-form-group
                        id="input-group-3"
                        label-cols-lg="auto"
                        label-size="large"
                        label="Добавить мероприятие в список:"
                >
                    <b-form-input
                            id="new-item-input"
                            v-model="newListItem"
                            @keyup.enter="addListItem"
                            type="text"
                            placeholder="Новое мероприятие"
                    ></b-form-input>
                </b-form-group>
            </b-card>

            <hr>

            <b-button variant="primary" class="mr-2" :disabled="!changed" @click="onSave">
                Сохранить
            </b-button>

            <b-button class="mr-2" :disabled="!changed" @click="onReset">
                {{formModes[currentMode].buttonText}}
            </b-button>

            <b-button variant="danger" class="mr-2" icon="box-arrow-right" v-b-modal.modal-exit>
                Вернуться на главную
            </b-button>

        </b-form>

        <b-modal
                id="modal-request"
                title="Внимание!"
                v-model="showModal"
                @ok="reloadData"
                @cancel="showModal=false"
        >
            <p class="my-4">{{formModes[currentMode].modalText}}</p>
        </b-modal>

        <b-modal
                id="modal-exit"
                title="Внимание!"
                @ok="onExit"
        >
            <p class="my-4">Вы действительно хотите вернуться на главную страницу?</p>
            <p class="my-3">(все несохраненные изменения будут потеряны)</p>
        </b-modal>

        <b-modal
                id="modal-delete"
                title="Внимание!"
                @ok="deleteAllArticle"
        >
            <p class="my-4">Вы действительно хотите удалить всю заметку?</p>
            <p class="my-3">(это действие невозможно будет отменить)</p>
        </b-modal>

    </div>

</template>


<script>

    import {mapMutations} from 'vuex';
    import store from '../store';

    export default {

        name: "Article",

        data() {
            const article = {
                id: +this.$route.params.id,
                title: +this.$route.params.id ?
                    store.getters.getArticleTitle(+this.$route.params.id) : '',
                list: +this.$route.params.id ?
                    JSON.parse(JSON.stringify(store.getters.getTodo(+this.$route.params.id))) :
                    []
            }
            return {
                storeArticle: JSON.parse(JSON.stringify(article)),
                localArticle: JSON.parse(JSON.stringify(article)),
                backupArticle: { id: 0, title: '', list: [] },
                newListItem: '',
                changed: false,
                showModal: false,
                formModes: [
                    {buttonText: 'Отменить изменения', modalText: 'Отменить сделанные изменения?'},
                    {buttonText: 'Вернуть изменения', modalText: 'Вернуть отмененные изменения?'}
                ],
                currentMode: 0
            }
        },

        methods: {

            ...mapMutations(['updateArticle', 'deleteArticle', 'addArticle']),

            reloadData() {
                if (this.currentMode) {
                    this.localArticle = JSON.parse(JSON.stringify(this.backupArticle));
                    this.currentMode--;
                } else {
                    this.backupArticle = JSON.parse(JSON.stringify(this.localArticle));
                    this.localArticle = JSON.parse(JSON.stringify(this.storeArticle));
                    this.currentMode++;
                }
            },

            formChanged() {
                this.changed = true;
                this.currentMode = 0
            },

            onSave() {
                if (this.localArticle.id) {
                    this.updateArticle(this.localArticle);
                } else {
                    this.localArticle.id = store.getters.getNewId();
                    this.addArticle(this.localArticle);
                }
                this.storeArticle = JSON.parse(JSON.stringify(this.localArticle));
                this.currentMode = 0;
                this.changed = false;
            },

            onReset() {
                this.showModal = true;
            },

            onExit() {
                this.$router.push({ name: 'Home' });
            },

            deleteListItem(index) {
                this.list.splice(index, 1);
                this.changed = true
            },

            addListItem() {
                if (this.newListItem) {
                    this.localArticle.list.push({text: this.newListItem, done: false});
                    this.newListItem = '';
                    document.getElementById('new-item-input').focus();
                }
            },

            deleteAllArticle() {
                this.deleteArticle(this.localArticle.id);
                this.onExit();
            }

        }

    }

</script>


<style scoped lang="sass">

    .wrapper
        width: 100%
        display: flex
        justify-content: center

    .list-item
        display: flex
        justify-content: flex-start
        padding: 5px

    .icon-delete
        width: 20px
        height: 20px
        margin-left: 5px
        cursor: pointer
        &:hover
            color: red

    .main
        width: 30px
        height: 30px
        position: absolute
        top: 5px
        right: 5px

</style>