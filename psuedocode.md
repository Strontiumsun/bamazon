Customer JS

1. When run, automatically displays all the items for sale
    - ID
    - name
    - prices
    - inventory
2. Prompts user to select the ID of the product they'd like to buy
3. Prompts user to ask how many units of the product they'd like to purchase
4. We check their request against our database
    - if there is sufficient product, the sale goes through and we alert the customer that the purchase was a success
        -- if amount in inventory minus ans.itemQuant is greater than 0, then perform inventory minus ans.itemQuant
        -- the amount of items in inventory is correspondingly depleted
    - if there is not enough product, we should prevent the order from going through and alerting the customer
5. If purchase is successful, display total cost of user's purchase to the user
6. Run the program again so the new information what is available for sale is known to the user
