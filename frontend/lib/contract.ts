const Caver = require("caver-js");
import abi from "../contract/abi/Lillybox.json";

export const mintVOD = async () => {};

export const guard = async () => {
  if (window.klaytn === undefined) {
    alert(
      "Please install kaikas!\nURL: https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
    );
    return false;
  }
  const flag = await isApprovedForAll();
  if (!flag) {
    if (confirm("Non-Approval Request: Not available.")) {
      await setApprovalForAll();
    } else {
      window.location.href = window.location.host;
      return false;
    }
  }
  return true;
};

export const isApprovedForAll = async () => {
	try {
		const caver = new Caver(window.klaytn);
		const [account] = await window.klaytn.enable();
		const contract = new caver.klay.Contract(
			abi as any,
			`${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`	
		);
		const receipt = await contract.call(
			{
				from: account,
			},
			"isApprovedForAll",
			account,
			contract._address
		);
		return receipt 
	} catch (errors) {
		console.error(errors);
		return false;
	}
}

export const setApprovalForAll = async () => {
  try {
    if (window.klaytn === undefined) {
      alert(
        "Please install kaikas!\nURL: https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
      );
    } else {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt1 = await contract.send(
        {
          from: account,
          gas: 500000,
        },
        "setApprovalForAll",
        contract._address,
        true
      );
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

export const callShowLKLAY = async () => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.call(
        {
          from: account,
        },
        "balanceOf",
        account,
        1
      );
      return receipt;
    }
  } catch (error) {
    console.error(error);
  }
};

export const callDontaion = async (
  toAddress: any,
  amount: any,
  lilAmount: any
) => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const peb = caver.utils.toPeb(amount);
      const receipt = await contract.send(
        {
          from: account,
          gas: 500000,
          value: peb,
        },
        "donation",
        toAddress,
        lilAmount
      );
      return receipt;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`callDonation Error ${error}`);
  }
};

export const callFlushDonationReward = async (amount: any, lilAmount: any) => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const peb = caver.utils.toPeb(amount);
      const receipt = await contract.send(
        {
          from: account,
          gas: 500000,
        },
        "flushDonationReward",
        peb,
        lilAmount
      );
      return receipt;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`callFlushDonationReward Error ${error}`);
  }
};

export const callStake = async (amount: any) => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const peb = caver.utils.toPeb(amount);
      const receipt = await contract.send(
        {
          from: account,
          gas: 500000,
          value: peb,
        },
        "stake"
      );
      return receipt;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`callStake Error ${error}`);
  }
};

export const callUnStake = async (index: number[]) => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.send(
        {
          from: account,
          gas: 500000,
        },
        "unstake",
        index
      );
      return receipt;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`callUnstake Error ${error}`);
  }
};

export const callFlushReward = async (index: number[]) => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.send(
        {
          from: account,
          gas: 500000,
        },
        "flushReward",
        index
      );
      return receipt;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`callFlushReward Error ${error}`);
  }
};

export const callShowWallet = async () => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.call(
        {
          from: account,
        },
        "showWallet",
        account
      );
      return receipt;
    }
  } catch (error) {
    console.log(error);
  }
};

export const callShowLil = async () => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.call(
        {
          from: account,
        },
        "balanceOf",
        account,
        0
      );
      return receipt;
    }
  } catch (error) {
    console.log(error);
  }
};

export const callShowTable = async () => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.call(
        {
          from: account,
        },
        "showTable"
      );
      return receipt;
    }
  } catch (error) {
    console.log(error);
  }
};

export const callFlushUnstakePendingBalance = async (index: number[]) => {
  try {
    const flag = await guard()
    if (flag) {
      const caver = new Caver(window.klaytn);
      const [account] = await window.klaytn.enable();
      const contract = new caver.klay.Contract(
        abi as any,
        `${process.env.NEXT_PUBLIC_CONTRACT_ADDR}`
      );
      const receipt = await contract.send(
        {
          from: account,
          gas: 500000,
        },
        "flushUnstakePendingBalance",
        index
      );
      return receipt;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`callFlushReward Error ${error}`);
  }
};
