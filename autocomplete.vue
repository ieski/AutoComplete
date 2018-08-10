    <div class="dropdown">
        <input :id="inputId" :name="inputId" type="hidden" v-model="id" />
        <input autocomplete="off" :id="inputValueId" :name="inputValueId"
               :placeholder="placeHolderValue"
               :class="className"
               :disabled="inputValueDisabled"
               type="text"
               v-model="value"
               @@input="searchValue()"
               @@keydown="handleKeyDown" />

        <ul id="container" class="dropdown-menu" style="z-index:1; overflow-y: auto; max-height:200px " v-bind:style="{ display: display}">
            <li v-for="(item, index) in items" :class="activeClass(index)" v-bind:id="item.id" v-on:click="selectItem(index)" @@keydown="handleKeyDown" @@mousemove="hoverItem(index)">
                <a>{{item.adi}}</a>
            </li>
        </ul>
    </div>
