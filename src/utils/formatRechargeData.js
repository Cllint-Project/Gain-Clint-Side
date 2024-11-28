export const formatRechargeData = (rechargeData,adminNumber, transactionId) => {
    const baseData = {
      recharge_amount: rechargeData.recharge_amount,
      recharge_option: rechargeData.recharge_option,
      phone_number: rechargeData.phone_number,
      admin_number: adminNumber,
      investor_id: rechargeData.investor_id,
      balance: 0,
      recharge_status: 'pending',
      transaction_id: transactionId,
    };
  
    if (!rechargeData.machine_details) {
        console.log(baseData,'basedata')
      return baseData;
    }
  
    const formattedMachineDetails = {
      machine_name: rechargeData.machine_details.machine_name,
      investment_amount: rechargeData.machine_details.investment_amount,
      investment_duration: Number(rechargeData.machine_details.investment_duration),
      daily_income: rechargeData.machine_details.daily_income,
      total_income: rechargeData.machine_details.total_income,
      invest_rate: rechargeData.machine_details.invest_rate,
      invest_limit: rechargeData.machine_details.invest_limit,
      vipStatus: rechargeData.machine_details.vipStatus,
      machine_image: rechargeData.machine_details.machine_image
    };
    console.log(formattedMachineDetails,'formattedMachineDetails')
    return {
        
      ...baseData,
      machine_details: formattedMachineDetails
    };
  };