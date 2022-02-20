<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container fadeIn">
                <h4 class="loading">Loading...</h4>
                <div class="loading-symbol"></div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: fit-content;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .loading {
        font-family: Orbitron;
        text-align: center;
    }

    .fadeIn {        
        animation: fadeIn ease-in 0.25s;
        animation-fill-mode: forwards;
    }

    .loading-symbol {
        width: 5vw;
        height: 5vw;
        margin: 3vh 3vw;

        background-image: url("../assets/logos/workflow-logo-thick-blue.png");
        background-size: cover;
        background-repeat: no-repeat;
        animation: rotation 15s infinite linear;
    }


    @keyframes fadeIn { from { transform: scale(0); opacity:0.3; } to { transform: scale(1); opacity:1; } }
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
</style>