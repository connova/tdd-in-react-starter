import React from 'react';

import { render, Simulate, wait } from "react-testing-library"
import "dom-testing-library/extend-expect";
import Joke from '../joke';
import JokeGenerator from '../jokeGenerator';

import * as axios from "axios"
import MockAxios from "axios-mock-adapter"


const mock = new MockAxios(axios, { delayResponse: Math.random() * 500});

afterAll(() => mock.restore());

test("Joke component receives props and then renders text", () => {
    const { getByTestId } = render(
        <Joke text="The funniest joke this year."/>    
    );

    expect(getByTestId("joke-text")).toHaveTextContent(
        "The funniest joke this year."
    );

    test("'JokeGenerator' component fetches a random joke a renders it", async () => {
    
        mock.onGet().replyOnce(200, {
            value: {
                joke: "really funny joke!"
            }
        });

        const { getByText, queryByText, queryByTestId } = render(<JokeGenerator />);

        Simulate.click(getByText("Load a random joke"));
        await wait(() => expect(queryByText("Loading...")).not.toBeInTheDom());

        expect(queryByText("You haven't loaded any joke yet!")).not.toBeInTheDom();
        expect(queryByTestId("joke-text")).toBeInTheDom();
    });
});