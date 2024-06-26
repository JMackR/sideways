// @ts-nocheck
//  Image Catalog
// Welcome to the catalog for all of our scalable vector graphics.
// Check out this doc for information on how to use this catalog and add to it:
import { deepFreeze } from '@upward/utilities/object-utils';
export interface LocalSVGSource {
  SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & SVGColors>;
  size?: {
    width: number | string;
    height: number | string;
  };
}

// Actions

import BabyCarriageSVG from './svgs/baby-carriage.svg';
import BellSVG from './svgs/bell.svg';
import CalendarSVG from './svgs/calendar.svg';
import CameraSVG from './svgs/camera.svg';
import CircleDollarSVG from './svgs/circle-dollar.svg';
import DesktopSVG from './svgs/desktop.svg';
import DollarSignSVG from './svgs/dollar-sign.svg';
import FaceConfusedSVG from './svgs/face-confused.svg';
import FileSVG from './svgs/file.svg';
import FolderSVG from './svgs/folder.svg';
import GearSVG from './svgs/gear.svg';
import GlobeSVG from './svgs/globe.svg';
import ImageSVG from './svgs/image.svg';
import PhoneCurveSVG from './svgs/landing/phone-curve.svg';
import CircleSVG from './svgs/login/circle.svg';
import FaceIDSVG from './svgs/login/face-id.svg';
import FingerPrintSVG from './svgs/login/fingerprint.svg';
import HelpSVG from './svgs/login/help.svg';
import LoginBackgroundSVG from './svgs/login/main-background.svg';
import RightArrowSVG from './svgs/login/right-arrow.svg';
import PhoneSVG from './svgs/phone.svg';
import WarningSVG from './svgs/warning.svg';

import ChevronLeftSVG from './svgs/chevron-left.svg';
import ChevronRightSVG from './svgs/chevron-right.svg';
import CircleEllipsisSVG from './svgs/circle-ellipsis.svg';
import EllipsisSVG from './svgs/ellipsis.svg';
import FamilyFillSVG from './svgs/family-fill.svg';
import FamilySVG from './svgs/family.svg';
import HandHoldingHeartFillSVG from './svgs/hand-holding-heart-fill.svg';
import HandHoldingHeartSVG from './svgs/hand-holding-heart.svg';
import HouseFillSVG from './svgs/house-fill.svg';
import HouseSVG from './svgs/house.svg';
import IdCardFillSVG from './svgs/id-card-fill.svg';
import IdCardSVG from './svgs/id-card.svg';

import CopySVG from './svgs/actions-copy.svg';
import ActionsAddSVG from './svgs/actions/actions-add-plus-icon.svg';
import CheckSVG from './svgs/actions/check.svg';
import CircleInfoSVG from './svgs/actions/circle-info.svg';
import CircleXMarkSVG from './svgs/actions/circle-xmark.svg';
import ErrorFaceSVG from './svgs/actions/error-face.svg';
import PlusSVG from './svgs/actions/plus.svg';
import XmarkSVG from './svgs/actions/xmark.svg';
import CloseSVG from './svgs/close.svg';
import LocationFillSVG from './svgs/location-fill-pin.svg';
import PencilSVG from './svgs/pencil.svg';
import ShareSVG from './svgs/share.svg';
// Selection
import CheckBoxSelectedSVG from './svgs/selection/checkbox-selected.svg';
import CheckBoxUnselectedSVG from './svgs/selection/checkbox-unselected.svg';
import RadioButtonSelectedDisabledSVG from './svgs/selection/radiobutton-selected-disabled.svg';
import RadioButtonSelectedSVG from './svgs/selection/radiobutton-selected.svg';
import RadioButtonUnselectedDisabledSVG from './svgs/selection/radiobutton-unselected-disabled.svg';
import RadioButtonUnselectedSVG from './svgs/selection/radiobutton-unselected.svg';

// Actions
import Arrow from './svgs/actions/actions-arrow.svg';
import ActionCancelSVG from './svgs/actions/actions-cancel.svg';
import AndroidChevron from './svgs/actions/actions-chevron-android-line.svg';
import LeftChevron from './svgs/actions/actions-chevron-left-line.svg';
import RightChevron from './svgs/actions/actions-chevron-right.svg';
import Clear from './svgs/actions/actions-clear.svg';
import CloseLine from './svgs/actions/actions-close-line.svg';
import ActionCloseModalSVG from './svgs/actions/actions-close-modal.svg';
import DeleteLineSVG from './svgs/actions/actions-delete-line.svg';
import DropDownFillSVG from './svgs/actions/actions-dropdown-fill.svg';
import EditPencilIcon from './svgs/actions/actions-edit-pencil.svg';
import EllipsisFill from './svgs/actions/actions-ellipsis-fill.svg';
import ActionInfoFillSVG from './svgs/actions/actions-info-fill.svg';
import ActionInfoSVG from './svgs/actions/actions-info.svg';
import MenuSVG from './svgs/actions/actions-menu.svg';
import TrashCircleFillSVG from './svgs/actions/actions-trash-circle-fill.svg';
import TrashIcon from './svgs/actions/actions-trash.svg';
import CameraOutlineSVG from './svgs/actions/camera-outline.svg';
import DownChevronSVG from './svgs/actions/down-chevron.svg';
import DownDragSVG from './svgs/actions/down-drag.svg';
import LeftArrowSVG from './svgs/actions/left-arrow.svg';
import LockSVG from './svgs/actions/lock.svg';
import PhotoRotate from './svgs/actions/photo-rotate.svg';
import RightArrowShortSVG from './svgs/actions/right-arrow-short.svg';
import RoundCheckSVG from './svgs/actions/round-check.svg';
import SelectPhotoSVG from './svgs/actions/select-photo.svg';
import AvatarSVG from './svgs/avatar/avatar-icon.svg';
import MoreSVG from './svgs/actions/more.svg';
import LogoutSVG from './svgs/actions/action-logout.svg';
// Plans
import ClockSVG from './svgs/plan-icons/clock.svg';
import ChangeSVG from './svgs/plan-icons/change.svg';
import ManageSVG from './svgs/plan-icons/manage.svg';
import SearchSVG from './svgs/plan-icons/search.svg';
import WalkerSVG from './svgs/plan-icons/walker.svg';
// Stats
import StepsSVG from './svgs/stats/steps.svg';
import RunnerSVG from './svgs/stats/runner.svg';
import AwardSVG from './svgs/stats/award.svg';
import StatsSVG from './svgs/stats/stats.svg';
import TrophySVG from './svgs/stats/trophy';

import UserSVG from './svgs/avatar/user.svg';
export const UserIcon: LocalSVGSource = deepFreeze({
  SVG: UserSVG,
  type: 'svg',
});
//STATS
export const TrophyIcon: LocalSVGSource = deepFreeze({
  SVG: TrophySVG,
  type: 'svg',
});
export const StatsIcon: LocalSVGSource = deepFreeze({
  SVG: StatsSVG,
  type: 'svg',
});
export const StepsIcon: LocalSVGSource = deepFreeze({
  SVG: StepsSVG,
  type: 'svg',
});
export const RunnerIcon: LocalSVGSource = deepFreeze({
  SVG: RunnerSVG,
  type: 'svg',
});
export const AwardIcon: LocalSVGSource = deepFreeze({
  SVG: AwardSVG,
  type: 'svg',
});

//Plans
export const ClockIcon: LocalSVGSource = deepFreeze({
  SVG: ClockSVG,
  type: 'svg',
});
export const ChangeIcon: LocalSVGSource = deepFreeze({
  SVG: ChangeSVG,
  type: 'svg',
});
export const ManageIcon: LocalSVGSource = deepFreeze({
  SVG: ManageSVG,
  type: 'svg',
});
export const SearchIcon: LocalSVGSource = deepFreeze({
  SVG: SearchSVG,
  type: 'svg',
});

export const WalkerIcon: LocalSVGSource = deepFreeze({
  SVG: WalkerSVG,
  type: 'svg',
});

import LogoSVG from './svgs/logo.svg';

export const LogoIcon: LocalSVGSource = deepFreeze({
  SVG: LogoSVG,
  type: 'svg',
});

export const MoreIcon: LocalSVGSource = deepFreeze({
  SVG: MoreSVG,
  type: 'svg',
});
export const AvatarIcon: LocalSVGSource = deepFreeze({
  SVG: AvatarSVG,
});
// Permissions
import PermissionsLocationSVG from './svgs/permissions/permissions-location.svg';
import PermissionsMotionSVG from './svgs/permissions/permissions-motion.svg';
import PermissionsNotificationSVG from './svgs/permissions/permissions-notification.svg';
// Permissions
export const PermissionsLocationIcon: LocalSVGSource = deepFreeze({
  SVG: PermissionsLocationSVG,
  type: 'svg',
});
export const PermissionsMotionIcon: LocalSVGSource = deepFreeze({
  SVG: PermissionsMotionSVG,
  type: 'svg',
});
export const PermissionsNotificationIcon: LocalSVGSource = deepFreeze({
  SVG: PermissionsNotificationSVG,
  type: 'svg',
});
// Selection
export const CheckBoxSelected: LocalSVGSource = deepFreeze({
  SVG: CheckBoxSelectedSVG,
  type: 'svg',
});
export const CheckBoxUnselected: LocalSVGSource = deepFreeze({
  SVG: CheckBoxUnselectedSVG,
  type: 'svg',
});
export const RadioButtonSelectedDisabled: LocalSVGSource = deepFreeze({
  SVG: RadioButtonSelectedDisabledSVG,
  type: 'svg',
});
export const RadioButtonSelected: LocalSVGSource = deepFreeze({
  SVG: RadioButtonSelectedSVG,
  type: 'svg',
});
export const RadioButtonUnselectedDisabled: LocalSVGSource = deepFreeze({
  SVG: RadioButtonUnselectedDisabledSVG,
  type: 'svg',
});
export const RadioButtonUnselected: LocalSVGSource = deepFreeze({
  SVG: RadioButtonUnselectedSVG,
  type: 'svg',
});

// Actions
export const LogoutIcon: LocalSVGSource = deepFreeze({
  SVG: LogoutSVG,
});
export const ArrowIcon: LocalSVGSource = deepFreeze({
  SVG: Arrow,
});
export const CancelIcon: LocalSVGSource = deepFreeze({
  SVG: ActionCancelSVG,
});
export const InfoFillIcon: LocalSVGSource = deepFreeze({
  SVG: ActionInfoFillSVG,
});
export const InfoIcon: LocalSVGSource = deepFreeze({
  SVG: ActionInfoSVG,
});

export const MenuIcon: LocalSVGSource = deepFreeze({
  SVG: MenuSVG,
});

export const ActionAndroidChevron: LocalSVGSource = deepFreeze({
  SVG: AndroidChevron,
});
export const ActionLeftChevron: LocalSVGSource = deepFreeze({
  SVG: LeftChevron,
});
export const ActionRightChevron: LocalSVGSource = deepFreeze({
  SVG: RightChevron,
});

export const ActionCloseModal: LocalSVGSource = deepFreeze({
  SVG: ActionCloseModalSVG,
});

export const ActionClear: LocalSVGSource = deepFreeze({
  SVG: Clear,
});
export const ActionClose: LocalSVGSource = deepFreeze({
  SVG: CloseLine,
});
export const DeleteLine: LocalSVGSource = deepFreeze({
  SVG: DeleteLineSVG,
});
export const DropDownFill: LocalSVGSource = deepFreeze({
  SVG: DropDownFillSVG,
});
export const EditPencil: LocalSVGSource = deepFreeze({
  SVG: EditPencilIcon,
  type: 'svg',
});
export const ActionEllipsisFill: LocalSVGSource = deepFreeze({
  SVG: EllipsisFill,
});

export const TrashCircleFill: LocalSVGSource = deepFreeze({
  SVG: TrashCircleFillSVG,
});
export const TrashCan: LocalSVGSource = deepFreeze({
  SVG: TrashIcon,
  type: 'svg',
});
export const CameraOutline: LocalSVGSource = deepFreeze({
  SVG: CameraOutlineSVG,
});
export const ActionDownChevron: LocalSVGSource = deepFreeze({
  SVG: DownChevronSVG,
});
export const DownDragIcon: LocalSVGSource = deepFreeze({
  SVG: DownDragSVG,
});
export const LockIcon: LocalSVGSource = deepFreeze({
  SVG: LockSVG,
});

export const PhotoRotateIcon: LocalSVGSource = deepFreeze({
  SVG: PhotoRotate,
});
export const RightArrow: LocalSVGSource = deepFreeze({
  SVG: RightArrowSVG,
});
export const LeftArrow: LocalSVGSource = deepFreeze({
  SVG: LeftArrowSVG,
});
export const RightArrowShort: LocalSVGSource = deepFreeze({
  SVG: RightArrowShortSVG,
});
export const RoundCheckIcon: LocalSVGSource = deepFreeze({
  SVG: RoundCheckSVG,
});
export const SelectPhotoIcon: LocalSVGSource = deepFreeze({
  SVG: SelectPhotoSVG,
});

export const LocationFillIcon: LocalSVGSource = Object.freeze({
  SVG: LocationFillSVG,
});

export const CopyIcon: LocalSVGSource = Object.freeze({
  SVG: CopySVG,
});
export const PencilIcon: LocalSVGSource = Object.freeze({
  SVG: PencilSVG,
});
export const ActionsAddIcon: LocalSVGSource = Object.freeze({
  SVG: ActionsAddSVG,
});
export const CheckIcon: LocalSVGSource = Object.freeze({
  SVG: CheckSVG,
});
export const CircleInfoIcon: LocalSVGSource = Object.freeze({
  SVG: CircleInfoSVG,
});
export const CircleXMarkIcon: LocalSVGSource = Object.freeze({
  SVG: CircleXMarkSVG,
});
export const PlusIcon: LocalSVGSource = Object.freeze({
  SVG: PlusSVG,
});
export const XmarkIcon: LocalSVGSource = Object.freeze({
  SVG: XmarkSVG,
});
export const CircleDollarIcon: LocalSVGSource = Object.freeze({
  SVG: CircleDollarSVG,
});
export const ChevronLeftIcon: LocalSVGSource = Object.freeze({
  SVG: ChevronLeftSVG,
});
export const ChevronRightIcon: LocalSVGSource = Object.freeze({
  SVG: ChevronRightSVG,
});
export const CircleEllipsisIcon: LocalSVGSource = Object.freeze({
  SVG: CircleEllipsisSVG,
});
export const EllipsisIcon: LocalSVGSource = Object.freeze({
  SVG: EllipsisSVG,
});
export const FamilyIcon: LocalSVGSource = Object.freeze({
  SVG: FamilySVG,
});
export const FamilyFillIcon: LocalSVGSource = Object.freeze({
  SVG: FamilyFillSVG,
});
export const HandHoldingHeartFillIcon: LocalSVGSource = Object.freeze({
  SVG: HandHoldingHeartFillSVG,
});
export const HandHoldingHeartIcon: LocalSVGSource = Object.freeze({
  SVG: HandHoldingHeartSVG,
});
export const HouseFillIcon: LocalSVGSource = Object.freeze({
  SVG: HouseFillSVG,
});
export const HouseIcon: LocalSVGSource = Object.freeze({
  SVG: HouseSVG,
});
export const IdCardFillIcon: LocalSVGSource = Object.freeze({
  SVG: IdCardFillSVG,
});
export const IdCardIcon: LocalSVGSource = Object.freeze({
  SVG: IdCardSVG,
});

export const DollarSignIcon: LocalSVGSource = Object.freeze({
  SVG: DollarSignSVG,
});

export const BabyCarriageIcon: LocalSVGSource = Object.freeze({
  SVG: BabyCarriageSVG,
});
export const BellIcon: LocalSVGSource = Object.freeze({
  SVG: BellSVG,
});
export const CalendarIcon: LocalSVGSource = Object.freeze({
  SVG: CalendarSVG,
});
export const CameraIcon: LocalSVGSource = Object.freeze({
  SVG: CameraSVG,
});
export const DesktopIcon: LocalSVGSource = Object.freeze({
  SVG: DesktopSVG,
});
export const FaceConfusedIcon: LocalSVGSource = Object.freeze({
  SVG: FaceConfusedSVG,
});
export const FileIcon: LocalSVGSource = Object.freeze({
  SVG: FileSVG,
});
export const FolderIcon: LocalSVGSource = Object.freeze({
  SVG: FolderSVG,
});
export const GearIcon: LocalSVGSource = Object.freeze({
  SVG: GearSVG,
});
export const GlobeIcon: LocalSVGSource = Object.freeze({
  SVG: GlobeSVG,
});
export const ImageIcon: LocalSVGSource = Object.freeze({
  SVG: ImageSVG,
});
export const PhoneIcon: LocalSVGSource = Object.freeze({
  SVG: PhoneSVG,
});

export const upwardsLogo: LocalSVGSource = Object.freeze({
  SVG: RightArrowSVG,
});
export const RightArrowIcon: LocalSVGSource = Object.freeze({
  SVG: RightArrowSVG,
});
export const LoginBackgroundIcon: LocalSVGSource = Object.freeze({
  SVG: LoginBackgroundSVG,
});
export const CircleBackgroundIcon: LocalSVGSource = Object.freeze({
  SVG: CircleSVG,
});
export const ErrorFaceIcon: LocalSVGSource = Object.freeze({
  SVG: ErrorFaceSVG,
});
export const FaceIDIcon: LocalSVGSource = Object.freeze({
  SVG: FaceIDSVG,
});
export const FingerprintIcon: LocalSVGSource = Object.freeze({
  SVG: FingerPrintSVG,
});
export const HelpIcon: LocalSVGSource = Object.freeze({
  SVG: HelpSVG,
});

export const Curve: LocalSVGSource = Object.freeze({
  SVG: PhoneCurveSVG,
});

export const WarningIcon: LocalSVGSource = Object.freeze({
  SVG: WarningSVG,
});
export const ShareIcon: LocalSVGSource = Object.freeze({
  SVG: ShareSVG,
});
export const CloseIcon: LocalSVGSource = Object.freeze({
  SVG: CloseSVG,
});
