const commonState = {
    namespaced: true,
  
    state: {
      isMenuOpen: true,
      temporaryState: {}
    },
  
    mutations: {
      TEMPORARY_STATE: (state, payload) => {
        state.temporaryState = { ...state.temporaryState, ...payload };
      },
      CHANGE_MENU_STATE:(state,payload) => {
          if(String(payload) === 'true' || String(payload) === 'false'){
              state.isMenuOpen = payload
          } else {
            state.isMenuOpen = !state.isMenuOpen;
          }
      }
    },
    actions: {
      temporaryState({ commit }, payload) {
        commit("TEMPORARY_STATE", payload);
      },
      changeMenuStatus({ commit }, payload){
        commit("CHANGE_MENU_STATE", payload);
      }
    }
  };
  
  export default commonState;
  