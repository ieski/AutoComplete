# AutoComplete

Vue.js 2 AutoComplete component

```html
<autocomplete url="\getList" v-on:parentevent="selectvalue($event)" id="id" value="adi" />
```  
```javascript
 <script type="text/javascript">

        var app = new Vue({
            el: "#app",
            data: {
                selectItem: {}
            },
            methods: {
                selectvalue(item) {
                    this.selectItem = item;
                }
            }
        });
 </script>
```
