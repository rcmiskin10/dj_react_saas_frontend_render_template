import api from "./Api.js";

function AccountService() {
  const retrieveBillingInfo = () => {
    return api.get("/payments/retrieve-billing-info/");
  };

  const postPaymentMethod = (paymentMethodId) => {
    api.post("/payments/add-payment-method/", {
      payment_method_id: paymentMethodId,
    });
  };

  const updateSubscription = (selectedProductId) => {
    api.post("/payments/update-subscription/", {
      selected_product_id: selectedProductId,
    });
  };

  const retrieveProfileInfo = () => {
    api.get("/accounts/retrieve-profile-info/");
  };

  const deleteProfile = () => {
    api.post("/accounts/delete-profile/");
  };
}

export default AccountService;
