import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'cards';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const cardActions = { ...slice.actions, ...extraActions };
export const cardsReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        cards: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

    return {
        getAll: getAll(),
        addCard: addCard()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`${baseUrl}?limit=50`)
        );
    }

    function addCard() {
        return createAsyncThunk(
            `${name}/addCard`,
            async (cardPayload) => await fetchWrapper.post(baseUrl, cardPayload)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...addCard()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.cards = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.cards = action.payload;
            },
            [rejected]: (state, action) => {
                state.cards = { error: action.error };
            }
        };
    }

    function addCard() {
        var { pending, fulfilled, rejected } = extraActions.addCard;
        return {
            [pending]: (state) => {
                state.card = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.card = action.payload;
                history.navigate('/');
            },
            [rejected]: (state, action) => {
                state.card = { error: action.error };
            }
        };
    }
}
