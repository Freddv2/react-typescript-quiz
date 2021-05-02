import React, {useState} from 'react'
import {OptionWrapper} from './TriviaSettings.style'
import {TriviaOption} from "../App";
import {Difficulty, NumberOfQuestion} from "../API";

type Props = {
    categories: TriviaOption[]
    nbOfQuestions: TriviaOption[]
    difficulties: TriviaOption[]
    startTriviaCallback: (category: number, nbOfQuestion: NumberOfQuestion, difficulty: Difficulty) => Promise<void>
}

enum SettingType {
    CATEGORY,
    NB_OF_QUESTIONS,
    DIFFICULTY
}

const TriviaSettings: React.FC<Props> = ({categories, nbOfQuestions, difficulties, startTriviaCallback}) => {

    const [category, setCategory] = useState(-1)
    const [nbOfQuestion, setNbOfQuestion] = useState(NumberOfQuestion.TEN)
    const [difficulty, setDifficulty] = useState(Difficulty.EASY)
    console.log(nbOfQuestions)
    const select = (e: React.MouseEvent<HTMLButtonElement>, type: SettingType) => {
        switch (type) {
            case SettingType.CATEGORY:
                setCategory(Number(e.currentTarget.value))
                break
            case SettingType.NB_OF_QUESTIONS:
                setNbOfQuestion(Number(e.currentTarget.value))
                break
            case SettingType.DIFFICULTY:
                setDifficulty(e.currentTarget.value as Difficulty)
                break;

        }
    }

    return (
        <div>
            <p>Category</p>
            <div>
                {categories.map(cat => (
                    <OptionWrapper
                        key={cat.id}
                        selected={cat.id === category}>
                        <div key={cat.id}>
                            <button value={cat.id} onClick={(e) => select(e, SettingType.CATEGORY)}>
                                {cat.name}
                            </button>
                        </div>
                    </OptionWrapper>
                ))}
            </div>
            <p>Difficulty</p>
            <div>
                {difficulties.map(diff => (
                    <OptionWrapper
                        key={diff.name}
                        selected={diff.name === difficulty}>
                        <div key={diff.name}>
                            <button value={diff.name} onClick={(e) => select(e, SettingType.DIFFICULTY)}>
                                {diff.name}
                            </button>
                        </div>
                    </OptionWrapper>
                ))}
            </div>
            <p>Number of Questions</p>
            <div>
                {nbOfQuestions.map(nb => (
                    <OptionWrapper
                        key={nb.name}
                        selected={Number(nb.name) === nbOfQuestion}>
                        <div key={nb.name}>
                            <button value={nb.name} onClick={(e) => select(e, SettingType.NB_OF_QUESTIONS)}>
                                {nb.name}
                            </button>
                        </div>
                    </OptionWrapper>
                ))}
            </div>
            <div>
                <button className="start generic-button page-horizontally-centered" onClick={() => startTriviaCallback(category, nbOfQuestion, difficulty)}>
                    Start
                </button>
            </div>
        </div>)
}

export default TriviaSettings