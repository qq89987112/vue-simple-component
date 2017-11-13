# idea
    如果是mask模式的Loading,可以源码这么实现：
    在loading组件中再放一个loading,用于maskType时使用。
    <loading ref="load-bottom" class="load-bottom"></loading>

# npm

# use
## 1
	<loading class="login" @click.native="login" wait ref="login">登录</loading>

     login() {
          this.$load("login");
          this.$store.dispatch('login', param).then((data) => {
            this.$router.push('/main');
          }).catch((err) => {
			this.$cancel("login");
            this.msg = "用户名或密码错误！"
          })
      },
	


## 2
	 <loading ref="loading" class="product-page" height="500">
		//page-content
	</loading>

	mounted(){
		this.loadPageContent().then(this.$cancelEx('loading'));
		//or
		//this.loadPageContent().then(()=>{this.$cancel('loading')});
	}

## 3
	<ul>
        <li v-for="item,key in collectlist">
			<loading ref="loading" @click="cancelCollect(item,key)" wait>取消收藏</loading>
		</li>
	</ul>
   
	cancelCollect(item,key){
 		this.$load('loading',key);
		cartapi.cancelCollect(item.id).then(this.$cancelEx('loading',key));
	}

