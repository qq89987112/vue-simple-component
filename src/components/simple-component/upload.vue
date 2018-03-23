<template>
  <Upload action="//jsonplaceholder.typicode.com/posts/" class="upload-component" :show-upload-list="false" :on-success="onUploaded">
    <div v-if="!$slots.default" class="default-upload">
      +
    </div>
    <slot></slot>
  </Upload>
</template>
<script>
    export default {
        name: 'upload',
        props:["value"],
        created(){
          console.log(this.$slots.default);
          debugger
        },
        methods:{
          onUploaded(response, file, fileList){
            this.$emit("input",'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEDElEQVR4Ae3cQW5cRwwE0FGgAzhA7porxGe1gRxBWev9RaHRPc0syrsCySKnCmRjJMgfP/759fW6+O/fv//61u3Pn7+/YePfgq/Xy3zj1ptv3Hqx9cZP4z9OE5ZvT4Easqff8eoaclzSPcJPy1dvrPXi1Ruc8p3PfLHz7GL77/I5bzdkV9HD9TXksKC7dDVkV8HD9Y83RH5vnHHx6o1N+fYX218sf6o3Xz5x4jM/8XdDVGwY15BhA2xfQ1RkGMc3ZHi+R/t0gy1YvfHW38bdkNuKh341JAh0O1xDbise+o2/Ias33vzVN0U9duvl28XdkF0FD9fXkMOC7tLVkF0FD9fHN+T2jU39fEOSHokv1af4af5uSFL8cryGXBY8tashSaHL8ccbsnqj3z2v83iz3x3389nP+C7uhuwqeLi+hhwWdJeuhuwqeLj+05t8mP843btvuAPf1qcbogPDuIYMG2D7GqIiw/hj9e9D0k1NN976lK8+1htf5bN+F+/O1w3ZdeBwfQ05LOguXQ3ZVfBw/eN7iDc43UTn2c23v/yrOM1jP/ON2z/lG7de3A1RkWFcQ4YNsH0NUZFh/PH19fXt79RXb6bzr9abn27uav7qfOY7j/3NTzjxdUOSgpfjNeSy4KldDUkKXY7Hn2V583bn8wbLn+Kpf6rfjdtfPuN+PuPiboiKDOMaMmyA7WuIigzj+LMs50s303yxN3WVbzXf/uLEl+J+HvkTlr8bkhS7HK8hlwVP7WpIUuhy/PGzrNX+3kDrV2+sfKl+Nd/5Ur1x69N85ie+boiKDeMaMmyA7WuIigzjz3TTVm+k+fKn+K4e9kt8zmO+8cSf4omvG6IDw7iGDBtg+xqiIsN4+XuIN9KbuPp5Ep/xxO88p+sTv/E0r/FuiIoM4xoybIDta4iKDOP4PcT50o1MNzvV20+c6lf7my+2f4qbL7bez9MNUbFhXEOGDbB9DVGRYfz4nfruPN7E/xtfmmd1ft8E+Y3Lb7wbooLDuIYMG2D7GqIiw3j5e8juvN5QceL35lovTnwpnvpZv5pvfTdERYZxDRk2wPY1REWG8eP/XHz3DfbzenONi9N88qV8+cWr9Snf+ezXDVGRYVxDhg2wfQ1RkWH8eEOcJ90889MNXc23v1i+hFN9iq/yr+rRDUkKX47XkMuCp3Y1JCl0OR7fkMvzvNIN9yabbzzNb37iM574U779uyFJ0cvxGnJZ8NSuhiSFLsfH35B0Y1f1SHze7JRv/1Rv3Hr7ibshKjaMa8iwAbavISoyjOMbkm7i6fnt540V2//d9fZbxc5nfTdERYZxDRk2wPY1REWG8eMNSTf69rzp5jpPml8+88XyW2/c+tX8boiKDuMaMmyA7WuIigzj/wC7sm2izpKNiwAAAABJRU5ErkJggg==');
            this.$emit("uploaded",'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEDElEQVR4Ae3cQW5cRwwE0FGgAzhA7porxGe1gRxBWev9RaHRPc0syrsCySKnCmRjJMgfP/759fW6+O/fv//61u3Pn7+/YePfgq/Xy3zj1ptv3Hqx9cZP4z9OE5ZvT4Easqff8eoaclzSPcJPy1dvrPXi1Ruc8p3PfLHz7GL77/I5bzdkV9HD9TXksKC7dDVkV8HD9Y83RH5vnHHx6o1N+fYX218sf6o3Xz5x4jM/8XdDVGwY15BhA2xfQ1RkGMc3ZHi+R/t0gy1YvfHW38bdkNuKh341JAh0O1xDbise+o2/Ias33vzVN0U9duvl28XdkF0FD9fXkMOC7tLVkF0FD9fHN+T2jU39fEOSHokv1af4af5uSFL8cryGXBY8tashSaHL8ccbsnqj3z2v83iz3x3389nP+C7uhuwqeLi+hhwWdJeuhuwqeLj+05t8mP843btvuAPf1qcbogPDuIYMG2D7GqIiw/hj9e9D0k1NN976lK8+1htf5bN+F+/O1w3ZdeBwfQ05LOguXQ3ZVfBw/eN7iDc43UTn2c23v/yrOM1jP/ON2z/lG7de3A1RkWFcQ4YNsH0NUZFh/PH19fXt79RXb6bzr9abn27uav7qfOY7j/3NTzjxdUOSgpfjNeSy4KldDUkKXY7Hn2V583bn8wbLn+Kpf6rfjdtfPuN+PuPiboiKDOMaMmyA7WuIigzj+LMs50s303yxN3WVbzXf/uLEl+J+HvkTlr8bkhS7HK8hlwVP7WpIUuhy/PGzrNX+3kDrV2+sfKl+Nd/5Ur1x69N85ie+boiKDeMaMmyA7WuIigzjz3TTVm+k+fKn+K4e9kt8zmO+8cSf4omvG6IDw7iGDBtg+xqiIsN4+XuIN9KbuPp5Ep/xxO88p+sTv/E0r/FuiIoM4xoybIDta4iKDOP4PcT50o1MNzvV20+c6lf7my+2f4qbL7bez9MNUbFhXEOGDbB9DVGRYfz4nfruPN7E/xtfmmd1ft8E+Y3Lb7wbooLDuIYMG2D7GqIiw3j5e8juvN5QceL35lovTnwpnvpZv5pvfTdERYZxDRk2wPY1REWG8eP/XHz3DfbzenONi9N88qV8+cWr9Snf+ezXDVGRYVxDhg2wfQ1RkWH8eEOcJ90889MNXc23v1i+hFN9iq/yr+rRDUkKX47XkMuCp3Y1JCl0OR7fkMvzvNIN9yabbzzNb37iM574U779uyFJ0cvxGnJZ8NSuhiSFLsfH35B0Y1f1SHze7JRv/1Rv3Hr7ibshKjaMa8iwAbavISoyjOMbkm7i6fnt540V2//d9fZbxc5nfTdERYZxDRk2wPY1REWG8eMNSTf69rzp5jpPml8+88XyW2/c+tX8boiKDuMaMmyA7WuIigzj/wC7sm2izpKNiwAAAABJRU5ErkJggg==');
          }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .upload-component{
    .default-upload{
      width: 80px;
      line-height: 80px;
      border: 2px dashed #e4e4e4;
      text-align: center;
      font-size: 20px;
    }
  }
</style>
