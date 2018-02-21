    Vue.component("autocomplete",
        {
            template: "#autocomplete",
            props: {
                url: { type: String, required: true },

                id: { type: String, required: true },

                parentevent: { type: Function, required: false },

                placeholdervalue: { type: String, required: true },

                classname: { type: String, required: true },

                pid: { type: String, required: true },
                pvalue: { type: String, required: true },

                value: { type: String, required: true }
            },
            data: function () {
                return {
                    islemId: "",
                    items: [],
                    selectedItem: {},

                    display: "none",

                    focusItem: 0,
                    searchTerm: ""
                }
            },
            created: function () {
                this.searchTerm = this.value;
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
                        (key == DOWN && this.focusItem >= this.items.length - 1)
                    ) {
                        e.preventDefault();
                        return;
                    }

                    var container = this.$el.querySelector("#container");

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
                            e.preventDefault();
                            this.display = "none";
                            if (this.items.length > 0)
                                this.selectItem(this.focusItem);
                            break;
                        case ESC:
                            break;
                    }
                    container.scrollTop = container.children[0].clientHeight * this.focusItem;

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

                    this.searchTerm = this.selectedItem[this.pvalue];

                    this.items = [];
                    this.focusItem = -1;
                    this.display = "none";

                    this.$emit('parentevent', this.selectedItem);

                },
                searchValue: function () {
                    this.display = "none";
                    this.items = [];
                    this.selectedItem = {};

                    if (this.searchTerm.length == 0) {
                        var emptyTtem = {};

                        emptyTtem[this.pid] = "";
                        emptyTtem[this.pvalue] = "";

                        this.$emit('parentevent', emptyTtem);
                    }
                        

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
                            alert("Hata Oluştu" + error);
                        });
                }
            }
        }
    );
