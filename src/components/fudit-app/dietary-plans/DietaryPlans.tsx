import React from 'react';

function DietaryPlans() {
    const plans = [
        "Vegetarian",
        "Vegan",
        "Ketogenic",
        "Paleo",
        "Gluten-free",
        "Low-carb",
        "Intermittent fasting",
        "Mediterranean",
        "DASH",
        "Flexitarian"
    ];

    return (
        <div>
            <h2>Dietary Plans</h2>
            <ul>
                {plans.map(plan => (
                    <li key={plan}>{plan}</li>
                ))}
            </ul>
        </div>
    );
}

export default DietaryPlans;
