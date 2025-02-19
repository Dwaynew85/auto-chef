import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../../ai"

const Main = () => {
  const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])
  const [recipe, setRecipe] = useState(false)
  // const ingredients = ["Chicken", "Oregano", "Tomatoes"]

  const getRecipe = async () => {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    console.log(recipeMarkdown)
  }

  const addIngredient = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    event.target.reset()
  }

  const toggleRecipe = () => {
    setRecipe(prevRecipe => !prevRecipe)
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
        <button onClick={getRecipe}>Add ingredient
        </button>
      </form>
      {ingredients.length > 0 && 
      <IngredientsList 
        ingredients={ingredients}
        toggleRecipe={toggleRecipe}
      />}
        {recipe && <ClaudeRecipe />}
    </main>
  )
}

export default Main