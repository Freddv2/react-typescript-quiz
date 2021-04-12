import {TriviaOption} from "./App";

export const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const getSelected = (triviaOptions: TriviaOption[]): TriviaOption | undefined => triviaOptions.find(trivOpt => trivOpt.selected)