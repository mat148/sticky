import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);

const _ = require('underscore');
 
export const store = new Vuex.Store({
    state: {
        stickyNotes: [],
        fingerPrint: null,
        cookiesEnabled: false,
        devMode: false,
        dummyFingerPrint: null,
        dataConnectionIssueVisible: false
    },
    getters: {},
    mutations: {
        replaceAllStickyNotes: (state, payload) => {
            const { data } = payload;
            state.stickyNotes = data;
        },
        addStickyNote: (state, payload) => {
            const { note } = payload;
            state.stickyNotes.push(note);
        },
        removeStickyNote: (state, payload) => {
            const { noteToBeDeleted } = payload;
            var id = noteToBeDeleted._id;

            state.stickyNotes.splice(_.indexOf(state.stickyNotes, _.findWhere(state.stickyNotes, {_id: id})), 1);
        },
        updateStickyNote: (state, payload) => {
            const { index, note } = payload;
            state.stickyNotes[index] = note;
        },
        updateFingerPrint: (state, payload) => {
            const { fingerPrint } = payload;
            state.fingerPrint = fingerPrint;
        },
        updateCookiesEnabled: (state, payload) => {
            const { cookiesEnabled } = payload;
            state.cookiesEnabled = cookiesEnabled;
        },
        toggleDataConnectionIssueModal: (state) => {
            state.dataConnectionIssueVisible = !state.dataConnectionIssueVisible;
        }
    },
    actions: {}
});