import Vue from "vue"

if(process.env.NODE_ENV==='development'){
    Array.prototype.$multi = function(multi=3){
        if(multi>1){
            let temp = [...this];
            Array.from(Array(multi)).forEach(()=>this.splice(this.length,0,...temp))
        }
        return this;
    }
    
    const persistence = new Proxy(JSON.parse(localStorage.dataPersistence||"{}"),{
        set(target, key,value, receiver){
            let result = Reflect.set(target, key, value, receiver);
            localStorage.dataPersistence = JSON.stringify(receiver);
            return result;
        }
    })


    Vue.mixin({
        created() {
            let 
                name = this.$options.name,
                data = persistence[name],
                definedData;

               

            // 当程序员修改data的数据后,应该让程序获取最新的data数据。
            // 也就是说,想要清除缓存只要修改data里的数据,可以改一下热加载后改回来。
            if(data&&data.data){
                let 
                    lastDefinedData = data.definedData,
                    tempData = Object.entries(data),
                    tempDefinedData = {...definedData},
                    dataGetter = this.$options.data;
                    data = data.data;

                    definedData = dataGetter instanceof Function ? dataGetter.bind(this)() : dataGetter || {};
                    

                    data = Object.entries(definedData).reduce((total,cur)=>{
                        let 
                            value1 = JSON.stringify(cur[1]),
                            value2 = lastDefinedData ? JSON.stringify(lastDefinedData[cur[0]]) : undefined;
                        if(value1===value2){
                            total[cur[0]] = data[cur[0]];
                        }else{
                            total[cur[0]] = cur[1];
                        }
                        return total;
                    },{})

                    

                    Object.assign(this,data)
            }

            name&&console.log(name,this._data);
            

            this.__keepData = ()=>{
                let name = this.$options.name;
                if(name){
                    persistence[name] = {
                        data:this._data,
                        definedData
                    };
                }
            };
            // 此刻拿到的数据已经为空{}
            window.addEventListener("beforeunload",this.__keepData)
        },
        beforeDestroy(){
            window.removeEventListener("beforeunload",this.__keepData)
            this.__keepData();
        }
    })
}
