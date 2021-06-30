import { gql } from '@apollo/client';

export const CHAR_LIST_QUERY = gql`
    query Characters {
        get_user_characters {
            characters {
                _id
                flavor {
                    traits {
                        name
                    }
                    portrait {
                        avatar
                    }
                    psychologicalDescription
                }
                stats {
                    race {
                        name
                    }
                    classes {
                        className
                        classLevel
                    }
                    background {
                        name
                    }
                }
            }
            errors {
                field
                error
            }
        }
        get_dm_characters {
            characters {
                _id
                flavor {
                    traits {
                        name
                    }
                    portrait {
                        avatar
                    }
                    psychologicalDescription
                }
                stats {
                    race {
                        name
                    }
                    classes {
                        className
                        classLevel
                    }
                    background {
                        name
                    }
                }
            }
            errors {
                field
                error
            }
        }
    }
`;