# AutoComplete

Vue.js 2 AutoComplete component

```html
<autocomplete 
              input-id="hiddenInputId"
              ref="frmCompanyInput"
              :current-key="company.companyType != null ? company.companyType.id : ''"
              :current-value="company.companyType != null ? company.companyType.adi : ''"
              :input-value-disabled="this.formDisabled"
              search-parm-name="name"
              items-id="id"
              items-value="value"
              url="\getList"
              class-name="form-control"
              place-holder-value="Company Type" 
              v-on:parentevent="selectItem($event)"
              />

```  
```javascript
 <script type="text/javascript">

        var app = new Vue({
            el: "#app",
            data: {
                selectItem: {}
            },
            computed: {
              getId: function () {              
                alert(this.$ref.frmCompanyInput.id);
              },
              getValue: function () {
                alert(this.$ref.frmCompanyInput.value);
              }
            },
            methods: {
                selectItem(item) {
                    this.selectItem = item;
                }
            }
        });
 </script>
```
