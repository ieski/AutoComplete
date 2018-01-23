Vue.component("autocomplete", {
    template:
`
                <div class="dropdown">
                    <div class="input-group" >
                        <input type="text" placeholder="Aranacak metin..." v-model="searchTerm" class="form-control" @input="searchValue()" @keydown="handleKeyDown" />
                        <span class="input-group-addon">
                            <span v-bind:class="okClass" aria-hidden="true"></span>
                        </span>
                    </div>

                    <ul class="dropdown-menu" style="position: relative" v-bind:style="{ display: display }"  >
                        <li v-for="(item, index) in items" :class="activeClass(index)" v-bind:id="item.id" v-on:click="selectItem(index)" @keydown="handleKeyDown" @mousemove="hoverItem(index)">
                            <a>{{item.adi}}</a>
                        </li>
                    </ul>
                </div>
                `,
    props: ["url", "parentevent", "id", "value"],
    data: function () {
        return {
            selectedItem: { },
            okClass:'glyphicon glyphicon-search',
            display: "none",
            focusItem: 0,
            searchTerm: "",
            items: []
        }        

    },
    methods: {
        handleKeyDown(e) {

            if (this.items.length == 0) return;

            var key = e.keyCode;

            // Key List
            const DOWN = 40;
            const UP = 38;
            const ENTER = 13;
            const ESC = 27;

            if (
                (key == UP && this.focusItem <= 0) ||
                (key == DOWN && this.focusItem >= this.items.length-1)
            ) {
                e.preventDefault();
                return;
            }

            switch (key) {
                case DOWN:
                    e.preventDefault();
                    this.focusItem++;
                    break;
                case UP:
                    e.preventDefault();
                    this.focusItem--;
                    break;
                case ENTER:
                    e.preventDefault()
                    this.display = "none";
                    if (this.items.length > 0)
                        this.selectItem(this.focusItem);

                    break;
                case ESC:
                    break;
            }

        },
        activeClass(i) {
            const focusClass = i === this.focusItem ? 'active' : "";
            return `${focusClass}`;
        },
        hoverItem(index) {
            this.focusItem = index;
        },
        selectItem: function (index) {
            this.selectedItem = this.items[index];

            this.searchTerm = this.selectedItem[this.value];

            this.items = [];
            this.focusItem = -1;

            this.$emit("parentevent", this.selectedItem);
            this.display = "none";
            this.okClass = "glyphicon glyphicon-ok";

        },
        searchValue: function () {

            this.okClass = "glyphicon glyphicon-search";

            this.display = "none";
            this.items = [];

            if (this.searchTerm.length < 3) return;

            const that = this;

            window.axios.get(this.url, { params: { value: this.searchTerm } })
                .then(function (response) {

                    if (response.data.length == 0) {
                        that.display = "none";
                        return;
                    }

                    that.items = response.data;
                    that.display = "inline-block";
                    that.focusItem = 0;
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }
}
);
