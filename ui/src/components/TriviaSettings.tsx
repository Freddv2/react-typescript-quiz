import React, {useState} from 'react'
import {OptionsWrapper, OptionWrapper, TriviaSettingsWrapper} from './TriviaSettings.style'
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
        <TriviaSettingsWrapper>
            <h2>Category</h2>
            <OptionsWrapper>
                {categories.map(cat => (
                    <OptionWrapper
                        key={cat.id}
                        selected={cat.id === category}>
                        <span key={cat.id}>
                            <button value={cat.id} onClick={(e) => select(e, SettingType.CATEGORY)}>
                                {cat.name}
                            </button>
                        </span>
                    </OptionWrapper>
                ))}
            </OptionsWrapper>
            <h2>Difficulty</h2>
            <OptionsWrapper>
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
            </OptionsWrapper>
            <h2>How Many Questions</h2>
            <OptionsWrapper>
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
            </OptionsWrapper>
            <div>
                <button className="generic-button page-horizontally-centered" style={{marginTop: "25px"}} onClick={() => startTriviaCallback(category, nbOfQuestion, difficulty)}>
                    Start
                </button>
            </div>
        </TriviaSettingsWrapper>)
}

export default TriviaSettings