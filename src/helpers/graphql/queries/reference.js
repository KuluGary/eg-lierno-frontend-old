import { gql } from "@apollo/client";

export const REFERENCE_QUERY = gql`
    query References {
        get_items {
            items {
                name
                description
                properties {
                    key
                    value
                }
            }
            errors {
                error
            }
        }
        get_armor {
            items {
                name
                description
                properties {
                    key
                    value
                }
            }
            errors {
                error
            }
        }
        get_weapons {
            items {
                name
                description
                properties {
                    key
                    value
                }
            }
            errors {
                error
            }
        }
        get_vehicles {
            items {
                name
                description
                properties {
                    key
                    value
                }
            }
            errors {
                error
                field
            }
        }
        get_spells {
            spells {
                name
                stats {
                    level
                    school
                    castingTime
                    range
                    components {
                        type
                        description
                    }
                    duration
                    description
                }
            }
            errors {
                error
                field
            }
        }
    }
`;