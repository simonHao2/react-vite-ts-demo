import ReactECharts from 'echarts-for-react';
import { Fragment } from 'react/jsx-runtime';
const HistogramCharts = () => {
    const myDate = new Date;
    const year = myDate.getFullYear();
    let now = new Date(year, 0, 0);
    const oneDay = 24 * 3600 * 1000;
    let j = true;
    const arrallyeardate: any = [];
    do {
        now = new Date(+now + oneDay);
        const month = now.getMonth() + 1;
        arrallyeardate.push(now.getFullYear() + "-" + month + "-" + now.getDate());
        if (month == 12 && now.getDate() == 31) {
            j = false;
        }
    } while (j)//通过do..while..语句循环查询本年每天日期
    console.log(arrallyeardate); //打印的是本年每天的日期
    const data: any = [];
    for (let k = 1; k <= arrallyeardate.length; k++) {
        data.push(randomRange(0, 500))
    }//随机生成对应的日期的
    function randomRange(min, max) { // min最小值，max最大值
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const getOptions = () => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    // dataView: {
                    //     show: true,
                    //     readOnly: false
                    // },
                    // magicType: {
                    //     show: true,
                    //     type: ['bar','line']
                    // },
                    // restore: {
                    //     show: true
                    // },
                    // saveAsImage: {
                    //     show: true
                    // }
                }
            },
            calculable: true,
            legend: {
                data: ['Growth', 'Budget 2011'],
                itemGap: 5
            },
            grid: {
                top: '12%',
                left: 30,
                right: 1,
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: arrallyeardate
            }],
            yAxis: [{
                type: 'value',
                name: 'Budget (million USD)',
                axisLabel: {
                    // formatter: function (a) {
                    //     a = +a;
                    //     return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
                    // }
                }
            }],
            dataZoom: [{
                show: true,
                start: 94,
                end: 100
            },
            {
                type: 'inside',
                start: 94,
                end: 100
            }
                //,{
                //show: true,
                //yAxisIndex: 0,
                //filterMode: 'empty',
                //width: 30,
                //height: '80%',
                //showDataShadow: false,
                //left: '93%'
                //}该段代码为y轴缩放，小编面对的需求不需要所以注释了
            ],
            series: [{
                name: 'Budget 2011',
                type: 'bar',
                data: data
            }
            ]
        }
    };
    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <ReactECharts
                        option={getOptions()}
                    />
                </div>
            </div>
        </Fragment>
    )
}
export default HistogramCharts;