import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"

const Main = () => {
  const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])
  const [recipeShown, setRecipeShown] = useState(false)
  // const ingredients = ["Chicken", "Oregano", "Tomatoes"]

  const addIngredient = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    event.target.reset()
  }

  const toggleRecipeShown = () => {
    setRecipeShown(prevRecipeShown => !prevRecipeShown)
  }

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={addIngredient} >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button >Add ingredient
        </button>
      </form>
      {ingredients.length > 0 && 
      <IngredientsList 
        ingredients={ingredients}
        toggleRecipeShown={toggleRecipeShown}
      />}
        {recipeShown && <ClaudeRecipe />}
    </main>
  )
}

export default Main