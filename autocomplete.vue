<script type="text/x-template" id="autocomplete">
    <div class="dropdown">
        <input autocomplete="off" type="text" :id="id" :name="id" v-model="searchTerm" :placeholder="placeholdervalue" :class="classname" @@input="searchValue()" @@keydown="handleKeyDown" />

        <ul id="container" class="dropdown-menu" style="position: relative; z-index:1; overflow-y: auto; max-height:200px " v-bind:style="{ display: display}">
            <li v-for="(item, index) in items" :class="activeClass(index)" v-bind:id="item.id" v-on:click="selectItem(index)" @@keydown="handleKeyDown" @@mousemove="hoverItem(index)">
                <a>{{item[pvalue]}}</a>
            </li>
        </ul>
    </div>
</script>
