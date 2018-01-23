# AutoComplete

```html
 <div class="modal-body">
    <autocomplete url="\getList" v-on:parentevent="selectvalue($event)" id="id" value="adi" />
  </div>
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
