namespace CompanyX.Tests;

using System.Diagnostics.CodeAnalysis;
using FluentAssertions;
using CompanyX;
using CompanyX.Services;
using CompanyX.Models;

public class DataServiceTests
{
    [Fact]
    public void AddRecord()
    {
        var dataService = new FakeDataService();
        var newRecord = new CustomerErpRecord { ProductionPlanNumber = 111, NameOfTheProduction = "Test production" };

        dataService.Add(newRecord);

        dataService.GetAll().Count.Should().Be(3);
        dataService.Get(111).NameOfTheProduction.Should().Be("Test production");
    }
}