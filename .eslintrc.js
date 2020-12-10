module.exports = {
    "extends": ["react-app"],
    "rules": {},
    "overrides": [
        {
            "files": ["**/*.js?(x)"],
            "rules": {
                "jsx-a11y/anchor-is-valid": "off",
                "react-hooks/exhaustive-deps": "off",
                "no-useless-escape": "off",
                "jsx-a11y/alt-text": "off",
                "react/style-prop-object": "off",
            }
        }

    ]
}