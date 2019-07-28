<template>
    <div>
        <el-card style="width: 700px;margin-left: auto;margin-right: auto">
            <div id="frame">
                <h1 style="text-align: center">Todos</h1>
                <div id="input frame">
                    <el-row>
                        <el-col :span="19">
                            <el-input size="medium" v-model="todoTitle" @keypress.enter.native="addNewTodoItem"
                                      placeholder="What needs to be done?"/>
                        </el-col>
                        <el-col :span="4" style="margin-left: 10px">
                            <el-button size="medium" type="primary" @click="addNewTodoItem">submit</el-button>
                        </el-col>
                    </el-row>
                </div>
                <br/>
                <el-tabs type="border-card" v-model="activeTabName" @tab-click="showTodoItems">
                    <el-tab-pane label="All" name="all">
                        <ul>
                            <todo-item
                                    v-for="(item,index) of todoItemsForDisplay"
                                    :key="index"
                                    :content="item.title"
                                    :id="item.id"
                                    :active="item.active"
                                    @delete="handelDelete"
                                    @toggleActiveStatus="handleToggleActiveStatus"/>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="Active" name="active">
                        <ul>
                            <todo-item
                                    v-for="(item,index) of todoItemsForDisplay"
                                    :key="index"
                                    :content="item.title"
                                    :id="item.id"
                                    :active="item.active"
                                    @delete="handelDelete"
                                    @toggleActiveStatus="handleToggleActiveStatus"/>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="Complete" name="complete">
                        <ul>
                            <todo-item
                                    v-for="(item,index) of todoItemsForDisplay"
                                    :key="index"
                                    :content="item.title"
                                    :id="item.id"
                                    :active="item.active"
                                    @delete="handelDelete"
                                    @toggleActiveStatus="handleToggleActiveStatus"/>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>

</template>

<script>
    import TodoItem from '../components/TodoItem'

    export default {
        components: {
            'todo-item': TodoItem,
        },
        data: function () {
            return {
                allTodoItems: JSON.parse(localStorage.getItem('allTodoItems')) || [],
                todoItemsForDisplay: [],
                todoTitle: '',
                activeTabName: 'all',
            }
        },
        created(){
            this.showTodoItems()
        },
        methods: {
            addNewTodoItem: function () {
                const newTodoItem = {
                    id: Math.ceil(Math.random() * 100000),
                    title: this.todoTitle,
                    active: true
                };
                this.allTodoItems.push(newTodoItem);
                this.todoItemsForDisplay.push(newTodoItem);
                this.todoTitle = '';
                this.$message.success('添加成功');
                this.storageTodoItems();
            },
            handelDelete(id) {
                this.todoItemsForDisplay = this.todoItemsForDisplay.filter(todoItem => todoItem.id !== id);
                this.allTodoItems = this.allTodoItems.filter(todoItem => todoItem.id !== id);
                this.storageTodoItems()
            },
            handleToggleActiveStatus(id) {
                for (const todoItem of this.allTodoItems) {
                    if (todoItem.id === id) {
                        todoItem.active = !(todoItem.active);
                        break;
                    }
                }
                this.showTodoItems();
            },
            storageTodoItems() {
                localStorage.setItem('allTodoItems', JSON.stringify(this.allTodoItems));
            },
            showTodoItems() {
                this.storageTodoItems();
                if (this.activeTabName === 'all') {
                    this.showAll()
                } else if (this.activeTabName === 'active') {
                    this.showActive()
                } else if (this.activeTabName === 'complete') {
                    this.showComplete()
                }
            },

            showAll() {
                this.activeTabName = 'all';
                this.todoItemsForDisplay = this.allTodoItems;
            },
            showActive() {
                this.activeTabName = 'active';
                this.todoItemsForDisplay = this._.cloneDeep(this.allTodoItems.filter(todoItem => todoItem.active));
            },
            showComplete() {
                this.activeTabName = 'complete';
                this.todoItemsForDisplay = this.allTodoItems.filter(todoItem => !todoItem.active);
            }

        }
    }
</script>

<style scoped>
    #frame {
        min-width: 450px;
        max-width: 450px;
        min-height: 300px;
        max-height: 300px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 100px;
        position: relative;
    }

</style>
