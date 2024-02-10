/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: "ca-central-1",
  aws_cognito_identity_pool_id:
    "ca-central-1:fad4c8a7-edd1-4dd3-9c87-42322f0440b5",
  aws_cognito_region: "ca-central-1",
  aws_user_pools_id: "ca-central-1_5ca3RMROp",
  aws_user_pools_web_client_id: "4recm6p513u0ghmahbgctknim1",
  oauth: {},
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: ["REQUIRES_NUMBERS", "REQUIRES_UPPERCASE"],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_cloud_logic_custom: [
    {
      name: "AdminQueries",
      endpoint:
        "https://1d42wp1etc.execute-api.ca-central-1.amazonaws.com/staging",
      region: "ca-central-1",
    },
  ],
};

export default awsmobile;
