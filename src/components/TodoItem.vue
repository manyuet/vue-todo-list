<template>
    <el-row>
        <el-col :span="2">
            <div @click="toggleActiveStatus">
                <i v-if="!active" class="el-icon-circle-check"></i>
                <i v-else class="el-icon-loading"></i>
            </div>
        </el-col>
        <el-col :span="20">
            <span>{{ content }}</span>
        </el-col>
        <el-col :span="2" >
            <i class="el-icon-delete" @click="deleteTodoItem"></i>
        </el-col>
    </el-row>

</template>

<script>
    export default {
        props: ['content', 'id', 'active'],
        methods: {
            deleteTodoItem() {
                this.$emit('delete', this.id)
            },
            toggleActiveStatus() {
                this.$emit('toggleActiveStatus', this.id);
            }

        }
    }
</script>


<style scoped>
    li {
        margin-left: 80px;
        margin-right: auto;
    }
</style>
