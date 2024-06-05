import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

function SelectCollection() {
    return (
        <div className="flex flex-row justify-around">
            <Select>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="모든 지역" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>지역</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[85px]">
                    <SelectValue placeholder="난이도" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>난이도</SelectLabel>
                        <SelectItem value="beginner">초급</SelectItem>
                        <SelectItem value="intermediate">중급</SelectItem>
                        <SelectItem value="advanced">고급</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default SelectCollection;
