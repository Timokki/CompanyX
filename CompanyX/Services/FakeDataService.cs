using CompanyX.Models;

namespace CompanyX.Services;

/// <summary>
/// FakeDataService presents a data source outside the program and provides data to
/// the program, which it refines for use by the application.
/// </summary>
public class FakeDataService : DataService
{
  private List<CustomerErpRecord> CustomerErpRecords { get; } = new List<CustomerErpRecord>{};

  public override List<CustomerErpRecord> GetAll() => CustomerErpRecords;

  public override CustomerErpRecord Get(int productionPlanNumber) => CustomerErpRecords.FirstOrDefault(p => p.ProductionPlanNumber == productionPlanNumber);

  public FakeDataService()
  {
      CustomerErpRecords.Add(new CustomerErpRecord { ProductionPlanNumber = 22467, NameOfTheProduction = "Mitallistettu 2x2" });
      CustomerErpRecords.Add(new MSDynamicsRecord { ToleranceInMillimeters = 0.55, ProductionPlanNumber = 32677, NameOfTheProduction = "Raakalauta 1x4"});
  } 

  public override void Add(CustomerErpRecord cDItem)
  {
      CustomerErpRecords.Add(cDItem);
  }

  public override void Delete(int id)
  {
      var cDItem = Get(id);
      if(cDItem is null)
        return;

      CustomerErpRecords.Remove(cDItem);
  }

  public override void Update(CustomerErpRecord cDItem)
  { 
      var index = CustomerErpRecords.FindIndex(p => p.ProductionPlanNumber == cDItem.ProductionPlanNumber);
      if(index == -1)
        return;

      CustomerErpRecords[index] = cDItem;
  }
}