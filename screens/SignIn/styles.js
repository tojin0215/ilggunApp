import { StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
	image: {
		//flex: 1,
		//resizeMode: "cover",
		justifyContent: 'flex-start',
		width: '100%',
		height: '100%',
		//paddingLeft: wp('10%'),
		//paddingRight: wp('10%'),
	},
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
		width: wp('30rem'),
		height: wp('30rem'),
		marginTop: hp('25%'),
	}, //상단 메인 로고입니다.
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		paddingHorizontal: wp('10rem'),
		paddingBottom: wp('20%'),
		justifyContent: 'center',
	}, //페이지 전체 박스입니다.
	titleArea: {
		width: '100%',
		padding: wp('3%'),
		marginBottom: wp('5%'),
		alignItems: 'center',
	}, //상단 로고를 포함한 최상단까지의 타이틀 공간입니다.
	formArea: {
		width: '100%',
		maxWidth: wp('100rem'),
		marginHorizontal: 'auto',
		marginVertical: hp('2%'),
		paddingBottom: wp('7%'),
	}, //아이디, 비밀번호 입력 폼 공간입니다.
	textArea: {
		flexDirection: 'row',
		borderBottomWidth: wp('0.3%'),
		borderBottomColor: '#67C8BA',
	}, //아이디, 비밀번호 입력 폼 공간입니다.
	idImg: {
		width: wp('16%'),
		height: wp('5%'),
		marginLeft: wp('1.3%'),
		marginTop: hp('3.5%'),
		marginRight: wp('8%'),
	}, //아이디 입력 라벨 이미지입니다.
	pwdImg: {
		width: wp('18%'),
		height: wp('4.3%'),
		marginLeft: wp('1.2%'),
		marginTop: hp('3.9%'),
		marginRight: wp('6%'),
	}, //패스워드 입력 라벨 이미지입니다.
	textForm: {
		width: '60%',
		height: hp('6%'),
		paddingLeft: wp('1.2%'),
		paddingRight: wp('1.2%'),
		marginTop: hp('2%'),
		fontSize: wp('4%'),
		fontFamily: 'NanumSquare',
		color: '#040525',
	}, //아이디 패스워드 입력 폼의 텍스트 입력 부분입니다.
	buttonArea: {
		width: '100%',
		height: hp('17%'),
		marginBottom: hp('15%'),
		backgroundColor: 'white',
	}, //세가지 로그인 버튼 공간입니다.
	button: {
		backgroundColor: '#67C8BA',
		width: '100%',
		height: hp('6%'),
		marginBottom: wp('3%'),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: wp('6%'),
	}, //로그인 첫번째 버튼입니다
	button1: {
		flexDirection: 'row',
		backgroundColor: '#f4f4f4',
		width: '100%',
		height: hp('6%'),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: wp('6%'),
		marginBottom: wp('3%'),
	}, //로그인 두번째 버튼입니다.
	googleImg: {
		position: 'absolute',
		top: hp('1%'),
		left: wp('5%'),
		width: wp('7%'),
		height: wp('7%'),
	}, //구글 로그인의 구글 아이콘 부분입니다.
	button2: {
		backgroundColor: '#cfd4db',
		borderRadius: wp('2%'),
		width: '100%',
		height: hp('5.2%'),
		justifyContent: 'center',
		alignItems: 'center',
	}, //회원가입 텍스트 공간입니다.
	buttonLoginTitle: {
		color: 'white',
		fontSize: wp('4.8%'),
		fontFamily: 'NanumSquare',
	}, //첫번째 로그인의 텍스트 부분입니다.
	buttonGoogleTitle: {
		color: '#040525',
		fontSize: wp('4.5%'),
		fontFamily: 'NanumSquare',
	}, //두번째 로그인 버튼의 구글 로그인 텍스트 부분입니다.
	buttonTitle: {
		color: '#040525',
		fontSize: wp('4.4%'),
		fontFamily: 'NanumSquare',
	}, //회원가입 버튼의 텍스트 부분입니다.
	buttonlogoArea: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		bottom: hp('2%'),
		width: '100%',
		height: hp('5%'),
	},
	logobottom: {
		width: wp('22%'),
		height: wp('3%'),
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	containerL: {
		backgroundColor: '#67C8BA',
		width: '100%',
		height: '100%',
		paddingLeft: wp('10%'),
		paddingRight: wp('10%'),
		paddingBottom: wp('15%'),
		justifyContent: 'center',
	},
	titleAreaL: {
		width: '100%',
		padding: wp('10%'),
		marginBottom: wp('5%'),
		alignItems: 'center',
	},
	textAreaL: {
		marginLeft: wp('5%'),
		marginBottom: wp('30%'),
	},
	text1L: {
		color: 'white',
		fontSize: wp('7%'),
		fontFamily: 'NanumSquare',
		marginBottom: wp('2%'),
	},
	text2L: {
		color: 'white',
		fontSize: wp('5.7%'),
		fontFamily: 'NanumSquare',
	},
	logoL: {
		justifyContent: 'center',
		width: wp('32%'),
		height: wp('30%'),
	},
	buttonlogoAreaL: {
		position: 'absolute',
		bottom: hp('3%'),
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default styles;
