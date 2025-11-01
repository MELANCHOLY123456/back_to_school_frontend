<template>
  <div class="dashboard">
    <!-- Top Cards -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总报名队伍</span>
          </div>
          <div class="text-center">
            <span class="count">{{ cardSummary.sumTeams }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总报名人数</span>
          </div>
          <div class="text-center">
            <span class="count">{{ cardSummary.sumPeople }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>预报名队伍</span>
          </div>
          <div class="text-center">
            <span class="count">{{ cardSummary.sumTeamsSignup }} </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>完成报名队伍</span>
          </div>
          <div class="text-center">
            <span class="count">{{ cardSummary.sumTeamsSignuped }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Pie and Bar Charts -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各学院报名人数</span>
          </div>
          <div id="peopleChartSpiltByCollege" style="width:100%; height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各学院队伍数</span>
          </div>
          <div id="teamChartSpiltByCollege" style="width:100%; height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Pie and Bar Charts -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各学院完成报名人数</span>
          </div>
          <div id="peopleChartSpiltByCollegeSignuped" style="width:100%; height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各学院完成报名队伍数</span>
          </div>
          <div id="teamChartSpiltByCollegeSignuped" style="width:100%; height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Pie and Bar Charts -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各省份报名人数</span>
          </div>
          <div id="peopleChartSpiltByProvince" style="width:100%; height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各省份报名队伍数</span>
          </div>
          <div id="teamChartSpiltByProvince" style="width:100%; height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Pie and Bar Charts -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各省份完成报名人数</span>
          </div>
          <div>
            <div id="peopleChartSpiltByProvinceSignuped" style="width:100%; height: 400px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>各省份完成报名队伍数</span>
          </div>
          <div>
            <div id="teamChartSpiltByProvinceSignuped" style="width:100%; height: 400px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;" type="flex" justify="center">
      <el-col :span="4">
        <el-button type="primary" @click="getStatisticalDataTable" width="100%">下载当前阶段全部统计数据</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getCardSummary, getChartData, getStatisticalDataTable } from '@/api/getInf'
// import Request from '@/utils/request'
import * as echarts from 'echarts'
// import { Toast } from 'vant'

export default {
  name: 'backFrameMain',
  components: {},
  mounted () {
    this.getData().then(() => {
      this.$nextTick(() => {
        if (this.shouldInit) {
          this.init()
        }
      })
    })

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    this.shouldInit = false // 退出页面时禁止初始化
    window.removeEventListener('resize', this.handleResize)
  },
  data () {
    return {
      shouldInit: true, // 动态标志控制
      cardSummary: {},
      chartData: {},
      abortController: null,
      peopleChartSpiltByCollegeInit: null,
      teamChartSpiltByCollegeInit: null,
      peopleChartSpiltByCollegeSignupedInit: null,
      teamChartSpiltByCollegeSignupedInit: null,
      peopleChartSpiltByProvinceInit: null,
      teamChartSpiltByProvinceInit: null,
      peopleChartSpiltByProvinceSignupedInit: null,
      teamChartSpiltByProvinceSignupedInit: null
    }
  },
  methods: {
    async getData () {
      let res = await getCardSummary()
      if (res && res.data) {
        this.cardSummary = res.data.cardsummary || {}
      } else {
        console.warn('未获取到有效数据')
        this.cardSummary = {}
      }

      res = await getChartData()
      if (res && res.data) {
        this.chartData = res.data.chartdata || {}
      } else {
        console.warn('未获取到有效数据')
        this.chartData = {}
      }
    },
    async getStatisticalDataTable () {
      await getStatisticalDataTable()
    },
    handleResize () {
      // 检查图表实例是否存在后再调用resize方法
      if (this.peopleChartSpiltByCollegeInit) {
        this.peopleChartSpiltByCollegeInit.resize()
      }
      if (this.teamChartSpiltByCollegeInit) {
        this.teamChartSpiltByCollegeInit.resize()
      }
      if (this.peopleChartSpiltByCollegeSignupedInit) {
        this.peopleChartSpiltByCollegeSignupedInit.resize()
      }
      if (this.teamChartSpiltByCollegeSignupedInit) {
        this.teamChartSpiltByCollegeSignupedInit.resize()
      }
      if (this.peopleChartSpiltByProvinceInit) {
        this.peopleChartSpiltByProvinceInit.resize()
      }
      if (this.teamChartSpiltByProvinceInit) {
        this.teamChartSpiltByProvinceInit.resize()
      }
      if (this.peopleChartSpiltByProvinceSignupedInit) {
        this.peopleChartSpiltByProvinceSignupedInit.resize()
      }
      if (this.teamChartSpiltByProvinceSignupedInit) {
        this.teamChartSpiltByProvinceSignupedInit.resize()
      }
    },
    init () {
      // 检查chartData是否存在
      if (!this.chartData) {
        console.warn('chartData is null or undefined')
        return
      }

      // 图表1 各学院报名人数
      const peopleChartSpiltByCollege = document.getElementById(
        'peopleChartSpiltByCollege'
      )
      console.log(peopleChartSpiltByCollege) // 检查该元素是否存在
      this.peopleChartSpiltByCollegeInit = echarts.init(
        peopleChartSpiltByCollege
      )
      // 缩放直方图的额外参数 prettier-ignore
      const dataAxisPeopleChartSpiltByCollege = this.chartData.spbci ? this.chartData.spbci.map(item => item.slice(0, 2)) : []
      // prettier-ignore
      const dataPeopleChartSpiltByCollege = this.chartData.spbcv || []
      const yMaxPeopleChartSpiltByCollege = 500
      const dataShadowPeopleChartSpiltByCollege = []
      for (let i = 0; i < (dataPeopleChartSpiltByCollege.length || 0); i++) {
        dataShadowPeopleChartSpiltByCollege.push(yMaxPeopleChartSpiltByCollege)
      }

      const peopleChartSpiltByCollegeOption = {
        // title: {
        //   text: '特性示例：渐变色 阴影 点击缩放',
        //   subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        // },
        xAxis: {
          data: dataAxisPeopleChartSpiltByCollege,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: dataPeopleChartSpiltByCollege
          }
        ]
      }

      peopleChartSpiltByCollegeOption &&
        this.peopleChartSpiltByCollegeInit.setOption(
          peopleChartSpiltByCollegeOption
        )

      // Enable data zoom when user click bar.
      const zoomSize = 6
      this.peopleChartSpiltByCollegeInit.on('click', function (params) {
        console.log(dataAxisPeopleChartSpiltByCollege[Math.max(params.dataIndex - zoomSize / 2, 0)])
        if (this.peopleChartSpiltByCollegeInit) {
          this.peopleChartSpiltByCollegeInit.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxisPeopleChartSpiltByCollege[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
              dataAxisPeopleChartSpiltByCollege[Math.min(params.dataIndex + zoomSize / 2, dataPeopleChartSpiltByCollege.length - 1)]
          })
        }
      })

      // 图表2 各学院队伍数
      const teamChartSpiltByCollege = document.getElementById(
        'teamChartSpiltByCollege'
      )
      this.teamChartSpiltByCollegeInit = echarts.init(
        teamChartSpiltByCollege
      )

      const teamChartSpiltByCollegeOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.stbci ? this.chartData.stbci.map(item => item.slice(0, 2)) : [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '队伍数',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.stbcv || []
          }
        ]
      }
      teamChartSpiltByCollegeOption &&
      this.teamChartSpiltByCollegeInit.setOption(
        teamChartSpiltByCollegeOption
      )

      // 图表3 各学院人数 已完成报名
      const peopleChartSpiltByCollegeSignuped = document.getElementById(
        'peopleChartSpiltByCollegeSignuped'
      )
      this.peopleChartSpiltByCollegeSignupedInit = echarts.init(
        peopleChartSpiltByCollegeSignuped
      )
      if (Array.isArray(this.chartData.cspci) && Array.isArray(this.chartData.cspcv) && this.chartData.cspci.length === this.chartData.cspcv.length) {
        const peopleChartSpiltByCollegeSignupedOption = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: this.chartData.cspci && this.chartData.cspcv
                ? this.chartData.cspci.map((item, i) => ({
                  value: this.chartData.cspcv[i],
                  name: item
                }))
                : []
            }
          ]
        }

        peopleChartSpiltByCollegeSignupedOption &&
        this.peopleChartSpiltByCollegeSignupedInit.setOption(
          peopleChartSpiltByCollegeSignupedOption
        )
      }

      // 图表4 各学院队伍已完成报名
      const teamChartSpiltByCollegeSignuped = document.getElementById(
        'teamChartSpiltByCollegeSignuped'
      )
      this.teamChartSpiltByCollegeSignupedInit = echarts.init(
        teamChartSpiltByCollegeSignuped
      )
      if (Array.isArray(this.chartData.cstci) && Array.isArray(this.chartData.cstcv) && this.chartData.cstci.length === this.chartData.cstcv.length) {
        const teamChartSpiltByCollegeSignupedOption = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: this.chartData.cstci && this.chartData.cstcv
                ? this.chartData.cstci.map((item, i) => ({
                  value: this.chartData.cstcv[i],
                  name: item
                }))
                : []
            }
          ]
        }
        teamChartSpiltByCollegeSignupedOption &&
        this.teamChartSpiltByCollegeSignupedInit.setOption(
          teamChartSpiltByCollegeSignupedOption
        )
      }
      // 图表5 各省份报名人数
      const peopleChartSpiltByProvince = document.getElementById(
        'peopleChartSpiltByProvince'
      )
      this.peopleChartSpiltByProvinceInit = echarts.init(
        peopleChartSpiltByProvince
      )
      const peopleChartSpiltByProvinceOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.spbpi ? this.chartData.spbpi.map(item => item.slice(0, 2)) : [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.spbpv || []
          }
        ]
      }
      peopleChartSpiltByProvinceOption &&
      this.peopleChartSpiltByProvinceInit.setOption(
        peopleChartSpiltByProvinceOption
      )
      // 图表6 各省份队伍
      const teamChartSpiltByProvince = document.getElementById(
        'teamChartSpiltByProvince'
      )
      this.teamChartSpiltByProvinceInit = echarts.init(
        teamChartSpiltByProvince
      )
      const teamChartSpiltByProvinceOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.stbpi ? this.chartData.stbpi.map(item => item.slice(0, 2)) : [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '队伍数',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.stbpv || []
          }
        ]
      }
      teamChartSpiltByProvinceOption &&
      this.teamChartSpiltByProvinceInit.setOption(
        teamChartSpiltByProvinceOption
      )
      // 图表7 各省份人数 已完成报名
      const peopleChartSpiltByProvinceSignuped = document.getElementById(
        'peopleChartSpiltByProvinceSignuped'
      )
      this.peopleChartSpiltByProvinceSignupedInit = echarts.init(
        peopleChartSpiltByProvinceSignuped
      )
      const peopleChartSpiltByProvinceSignupedOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.csppi ? this.chartData.csppi.map(item => item.slice(0, 2)) : [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.csppv || []
          }
        ]
      }
      peopleChartSpiltByProvinceSignupedOption &&
      this.peopleChartSpiltByProvinceSignupedInit.setOption(
        peopleChartSpiltByProvinceSignupedOption
      )
      // 图表8 各省份队伍 已完成报名
      const teamChartSpiltByProvinceSignuped = document.getElementById(
        'teamChartSpiltByProvinceSignuped'
      )
      this.teamChartSpiltByProvinceSignupedInit = echarts.init(
        teamChartSpiltByProvinceSignuped
      )
      const teamChartSpiltByProvinceSignupedOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.cstpi ? this.chartData.cstpi.map(item => item.slice(0, 2)) : [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '队伍数',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.cstpv || []
          }
        ]
      }
      teamChartSpiltByProvinceSignupedOption &&
      this.teamChartSpiltByProvinceSignupedInit.setOption(
        teamChartSpiltByProvinceSignupedOption
      )
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}

.text-center {
  font-size: 24px;
  font-weight: bold;
}

.count {
  font-size: 28px;
  color: #409eff;
}

.el-card {
  height: 100%;
}
</style>
