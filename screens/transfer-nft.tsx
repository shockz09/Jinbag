import { useEffect, useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { getSupportedNetworks, transferNFT } from "rn-okto-sdk"
import { Network } from "../types/network"
import DropDownPicker from "react-native-dropdown-picker"
import { NavigationProp } from "@react-navigation/native"
import { RootStackParamList } from "../navigtion"
import { Order, ResultOrder } from "../types/order"

const TransferNFTScreen = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const operationType = "NFT_TRANSFER"
    const [networkName, setNetworkName] = useState<string>("APTOS_TESTNET")
    const [collectionAddress, setCollectionAddress] = useState<string>("0x171e643e8e8dabc66b838b9055dbdf88647cf6601b164f5987f50a497bedfbe1")
    const [collectionName, setCollectionName] = useState<string>("super avengers")
    const [quantity, setQuantity] = useState<string>("1")
    const [recipientAddress, setRecipientAddress] = useState<string>("0x46e5fb2f9af287a5bcd9756ff35494c41b7371446da3daf98e1f1de58331c55f")
    const [nftAddress, setNftAddress] = useState<string>("0xf137ad32d4d695c9eb7cb4831e6198924afe5fb8c51576e8a5b5b07f6da8e0d3")

    const [openNetwork, setOpenNetwork] = useState(false);
    const [networkOptions, setNetworkOptions] = useState<Network[]>([])

    useEffect(() => {
        getSupportedNetworks((result, error) => {
            if (result) {
                const networks: Network[] = JSON.parse(result);
                setNetworkOptions(networks)
            }
        })
    }, [])

    const handleSubmit = () => {
        transferNFT(
            operationType,
            quantity,
            recipientAddress,
            networkName,
            nftAddress,
            collectionAddress,
            collectionName,
            (result, error) => {
                console.log(result);
                console.log(error);
                if(result){
                    const order: ResultOrder = JSON.parse(result);
                    navigation.navigate("NftOrderDetails", { orderId: order.data.order_id });
                }
            }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transfer NFT</Text>
            <DropDownPicker
                open={openNetwork}
                value={networkName}
                items={networkOptions.map((network) => ({
                    label: network.network_name,
                    value: network.network_name,
                }))}
                setOpen={setOpenNetwork}
                setValue={setNetworkName}
                setItems={setNetworkOptions}
                placeholder="Select Network"
                style={styles.dropdown}
            />
            <TextInput
                value={collectionName}
                onChangeText={(value) => setCollectionName(value)}
                placeholder="Enter Collection Name"
                style={styles.input}
            />

            <TextInput
                value={quantity}
                onChangeText={(value) => setQuantity(value)}
                placeholder="Enter Quantity"
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                value={recipientAddress}
                onChangeText={(value) => setRecipientAddress(value)}
                placeholder="Enter Recipient Address"
                style={styles.input}
            />

            <TextInput
                value={nftAddress}
                onChangeText={(value) => setNftAddress(value)}
                placeholder="Enter NFT Address"
                style={styles.input}
            />

            <Button
                title="Transfer NFT"
                onPress={handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 8
    },
    header: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    dropdown: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
})

export default TransferNFTScreen