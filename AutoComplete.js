    Vue.component("autocomplete",
        {
            template: "#autocomplete",
            props: {
                url: { type: String, required: true },

                inputId: { type: String, required: true },
                inputValueId: { type: String, required: false },
                inputValueDisabled: { type: Boolean, required: false, default: false },

                itemsId: { type: String, required: true },
                itemsValue: { type: String, required: true },

                placeHolderValue: { type: String, required: true },
                className: { type: String, required: true },

                currentKey: { required: true },
                currentValue: { type: String, required: true },

                searchParmName: { type: String, required: true },
            },
            data: function () {
                return {
                    item: {},
                    id: "",
                    value: "",
                    items: [],
                    display: "none",
                    focusItem: 0,
                }
            },
            watch: {
                currentValue: function (val) {
                    this.value = val;
                },
                currentKey: function (val) {
                    this.id = val;
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
                    const focusClass = i === this.focusItem ? 'dropdown-item active' : "dropdown-item";
                    return `${focusClass}`;
                },
                hoverItem(index) {
                    this.focusItem = index;
                },
                selectItem: function (index) {
                    this.item = this.items[index];

                    this.id = this.item[this.itemsId];
                    this.value = this.item[this.itemsValue];

                    this.items = [];
                    this.focusItem = -1;
                    this.display = "none";
                    this.$emit('parentevent', this.item);

                },
                searchValue: function () {
                    this.display = "none";
                    this.items = [];

                    if (this.value.length == 0) {
                        this.item[this.itemsId] = "";
                        this.item[this.itemsValue] = "";
                        this.id = "";
                        this.$emit('parentevent', this.item);
                        return;
                    }

                    if (this.value.length < 3) return;

                    const that = this;
                    var params = {};
                    params[this.searchParmName] = this.value;

                    window.axios.get(this.url, { params })
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
