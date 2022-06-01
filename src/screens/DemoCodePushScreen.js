import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import CodePush from "react-native-code-push";

const DemoCodePushScreen = () => {
    const [syncMessage, setSyncMessage] = useState('')
    const [progress, setProgress] = useState(false)
    const [restartAllowed, setRestartAllowed] = useState()
    useEffect(() => {
        syncImmediate()
    }, [])


    const codePushStatusDidChange = (syncStatus) => {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                setSyncMessage("Đang kiểm tra phiên bản mới...");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                setSyncMessage("Đang tải gói");
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                setSyncMessage("Đợi người dùng chấp nhận");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                setSyncMessage("Đang cài đặt phiên bản mới");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                setSyncMessage("Phiên bản đã được update.");
                setProgress(false)

                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                setSyncMessage("Bỏ qua cập nhật");
                setProgress(false)

                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                setSyncMessage("Gói đã được cài đặt, sẽ được áp dụng sau khi khởi động lại app");
                setProgress(false)
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                setSyncMessage("An unknown error occurred.");
                setProgress(false)

                break;
        }
    }

    const codePushDownloadDidProgress = (progress) => {
        setProgress(progress)
    }

    const toggleAllowRestart = () => {
        restartAllowed
            ? CodePush.disallowRestart()
            : CodePush.allowRestart();
        setRestartAllowed(!restartAllowed);
    }

    const getUpdateMetadata = () => {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata) => {
                setSyncMessage(metadata ? JSON.stringify(metadata) : "Running binary version");
                setProgress(false)
            }, (error) => {
                setSyncMessage("Error: " + error);
                setProgress(false)
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended) */
    const sync = () => {
        CodePush.sync(
            {},
            codePushStatusDidChange,
            codePushDownloadDidProgress
        );
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    const syncImmediate = () => {
        CodePush.sync(
            { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
            codePushStatusDidChange,
            codePushDownloadDidProgress
        );
    }


    const renderProgressView = () => {
        let progressView = <></>;
        if (progress) {
            progressView = (
                <Text style={styles.messages}>{progress.receivedBytes} of {progress.totalBytes} bytes received</Text>
            );
        }
        return progressView
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Demo CodePush! V1
            </Text>
            {/* <TouchableOpacity onPress={sync}>
                <Text style={styles.syncButton}>Press for background sync</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={syncImmediate}>
                <Text style={styles.syncButton}>Kiểm tra phiên bản mới</Text>
            </TouchableOpacity>
            {renderProgressView}
            <Image style={styles.image} resizeMode={"contain"} source={require("../../images/laptop_phone_howitworks.png")} />
            {/* <TouchableOpacity onPress={toggleAllowRestart}>
                <Text style={styles.restartToggleButton}>Restart {restartAllowed ? "allowed" : "forbidden"}</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={getUpdateMetadata}>
                <Text style={styles.syncButton}>Press for Update Metadata</Text>
            </TouchableOpacity> */}
            <Text style={styles.messages}>{syncMessage || ""}</Text>
        </View>
    );

}

export default DemoCodePushScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 50
    },
    image: {
        margin: 30,
        width: Dimensions.get("window").width - 100,
        height: 365 * (Dimensions.get("window").width - 100) / 651,
    },
    messages: {
        marginTop: 30,
        textAlign: "center",
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
});
